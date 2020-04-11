import express from 'express'
import axios from 'axios'

import { connect } from './mongo'
import createServer from './graphql/createServer'

const server = createServer()
const app = express()

connect()
  .then(() => {
    server.applyMiddleware({ app })
    app.get('/', (req, res) => {
      return res.json({ bocado: '🥑' })
    })
    app.post('/blog-deploy', (req, res) => {
      return axios({
        method: 'POST',
        url: 'https://api.travis-ci.org/repo/bocadoapp%2Fblog/requests',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Travis-API-Version': 3,
          'Authorization': `token ${process.env.TRAVIS_TOKEN}`
        },
        data: {
          request: {
            branch: "master"
          }
        }
      })
        .then(r => res.json(r.data))
        .catch(err => res.status(400).send(err.toString()))
    })
    app.listen(process.env.PORT || 3000, () => console.log('Server runnning!'))
    return app
  })
  .catch(e => {
    throw e
  })