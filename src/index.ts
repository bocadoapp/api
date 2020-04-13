import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { resolve } from 'path'
import { config } from 'dotenv'

console.log('ENVVVV', process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production') {
  config({ path: resolve(__dirname, "./.env") })
}

import { connect } from './mongo'
import createServer from './graphql/createServer'
import routes from './rest'

const server = createServer()
const app = express()
const PORT = process.env.PORT || 4000

connect()
  .then(() => {
    server.applyMiddleware({ app })
    app.use(bodyParser.json())
    app.use(cors())
    app.use('/', routes)
    app.listen(PORT, () => console.log(`Server runnning on ${PORT}`))
    return app
  })
  .catch(e => {
    throw e
  })