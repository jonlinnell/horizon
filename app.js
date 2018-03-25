/* eslint-disable no-console */
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const fs = require('fs')
const helmet = require('helmet')
const http = require('http')
const https = require('https')
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')

require('colors')

if (!fs.existsSync('./config/config.json')) {
  throw Error('General configuration (./config/config.json) doesn\'t exist.')
}

if (!fs.existsSync('./config/db.js')) {
  throw Error('Database configuration (./config/db.js) doesn\'t exist.')
}

if (!fs.existsSync('./config/secret')) {
  throw Error('No secret key file found. Please create one in ./config/secret and chmod to 600.')
}

const {
  port,
  createDefaultAdmin,
  defaultAdminPassword,
  tls
} = require('./config/config.json')

const models = require('./models')
const { User } = require('./models')

const app = express()

const logDir = path.join(__dirname, 'logs')
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const accessLog = rfs('access.log', {
  interval: '1d',
  path: logDir
})

app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(morgan('combined', { stream: accessLog }))

console.log(`Launching in ${process.env.NODE_ENV || 'development'} mode.`.cyan)

/* Remember to filter fixed routes in the Joi schema */
require('./routes/auth')(app)
require('./routes/event')(app)

models.sequelize.sync().then(() => {
  console.log(`[${'DB'.bold}] Connection established.`.green)

  if (createDefaultAdmin) {
    User.findOne({
      where: { username: 'admin' },
      attributes: { exclude: ['password'] }
    })
      .then((user) => {
        if (!user) {
          const hashedPassword = bcrypt.hashSync(defaultAdminPassword, 8)

          User.create({
            username: 'admin',
            password: hashedPassword
          })
            .then(() => {
              console.log('Default admin account doesn\'t exist. Creating it.'.yellow)
            })
        }
      })
  }

  app.get('/status', (req, res) => {
    res.status(200).json({ message: 'Hello there!' })
  })

  if (process.env.NODE_ENV === 'production') {
    const options = {
      cert: fs.readFileSync(tls.certificate),
      key: fs.readFileSync(tls.certificate)
    }
    https.createServer(options, app).listen(port)
    console.log(`[${'API'.bold}] Service (https) started on ${port}.`.green)
  } else {
    http.createServer(app).listen(port)
    console.log(`[${'API'.bold}] Service (http) started on ${port}.`.green)
  }
})
