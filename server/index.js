/* eslint-disable no-console */
import bcrypt from 'bcryptjs'
import chalk from 'chalk'
import fs from 'fs'
import { ApolloServer, gql } from 'apollo-server'

import models, { User } from './models'

import {
  createDefaultAdmin,
  defaultAdminPassword,
} from './config/config.json'

if (!fs.existsSync('./config/secret')) {
  throw new Error('No secret key file found. Please create one in ./config/secret and chmod to 600.')
}

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      hello: String!
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'world!',
    },
  },
})

server.listen()
  .then(({ url }) => {
    console.log(`Server up on ${url} in ${process.env.NODE_ENV || 'development'} mode.`)
  })

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
})
