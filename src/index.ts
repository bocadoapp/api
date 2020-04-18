import { resolve } from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: resolve(__dirname, "./.env") })
}

import { connect } from './mongo'
import createServer from './createServer'
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