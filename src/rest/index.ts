import express from 'express'
import axios from 'axios'

interface IMailchimpMergePayload {
  FNAME: string,
  LNAME: string
}

interface IMailchimpSubscribePayload {
  email_address: string,
  status: string,
  merge_fields?: IMailchimpMergePayload
}

const router = express.Router()

router.get('/', (req, res) => res.json({ bocado: '🥑' }))

router.post('/blog-deploy', (req, res) =>
  axios({
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
    .catch(err => res.status(400).send(err.toString())))

router.post('/mailchimp-subscribe', (req, res) => {  
  if (!req.body.mail) {
    return res.status(400).send({ error: 'Mail is mandatory' })
  }

  const listId = req.body.listId || '2686a081fb'
  const data: IMailchimpSubscribePayload = { email_address: req.body.mail, status: "subscribed" }

  if (req.body.name || req.body.surname) {
    data.merge_fields = {
      FNAME: req.body.name,
      LNAME: req.body.surname
    }
  }
  
  return axios({
    method: 'POST',
    url: `https://us19.api.mailchimp.com/3.0/lists/${listId}/members/`,
    auth: {
      username: 'BocadoApp',
      password: 'b032a1d05509117bb2f37fcb1aeed295-us19'
    },
    data
  })
    .then(r => res
      .status(r.status)
      .send({ status: r.statusText })
    )
    .catch(err =>
      res
        .status(err.response.data.status)
        .send({ error: err.response.data.title, message: err.response.data.detail })
    )
})

export default router