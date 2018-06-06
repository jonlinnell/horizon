/* eslint-disable no-console */
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const chalk = require('chalk')
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

if (!fs.existsSync('./config/config.json')) {
  throw new Error('General configuration (./config/config.json) doesn\'t exist.')
}

if (!fs.existsSync('./config/secret')) {
  throw new Error('No secret key file found. Please create one in ./config/secret and chmod to 600.')
}

const {
  port,
  createDefaultAdmin,
  defaultAdminPassword,
  tls,
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
  path: logDir,
})

app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(morgan('combined', { stream: accessLog }))

console.log(chalk.cyan(`Launching in ${process.env.NODE_ENV || 'development'} mode.`))

/* Remember to filter fixed routes in the Joi schema */
require('./routes/auth')(app)
require('./routes/event')(app)

models.sequelize.sync().then(() => {
  console.log(chalk.green(`[${chalk.bold('DB')}] Connection established.`))

  if (createDefaultAdmin) {
    User.findOne({
      where: { username: 'admin' },
      attributes: { exclude: ['password'] },
    })
      .then((user) => {
        if (!user) {
          const hashedPassword = bcrypt.hashSync(defaultAdminPassword, 8)

          User.create({
            username: 'admin',
            password: hashedPassword,
            administrator: true,
          })
            .then(() => {
              console.log(chalk.yellow('Default admin account doesn\'t exist. Creating it.'))
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
      key: fs.readFileSync(tls.certificate),
    }

    https.createServer(options, app).listen(port)
    console.log(chalk.green(`[${chalk.bold('API')}] Service (https) started on ${port}.`))
  } else {
    http.createServer(app).listen(port)
    console.log(chalk.green(`[${chalk.bold('API')}] Service (http) started on ${port}.`))
  }
})
