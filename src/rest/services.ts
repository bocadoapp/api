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

export const mailchimpSubscribe = async (userData: any, listId = '2686a081fb') => {
  if (!userData.email) {
    throw new Error('Mail is mandatory')
  }

  const data: IMailchimpSubscribePayload = { email_address: userData.email, status: "subscribed" }

  if (userData.name || userData.surname) {
    data.merge_fields = {
      FNAME: userData.name,
      LNAME: userData.surname
    }
  }

  try{
    const response = await axios({
      method: 'POST',
      url: `https://us19.api.mailchimp.com/3.0/lists/${listId}/members/`,
      auth: {
        username: 'BocadoApp',
        password: process.env.MAILCHIMP_TOKEN
      },
      data
  })

    return response
  } catch(err){
    throw new Error(err.response.data.title + " " + err.response.data.detail)
  }
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
  let userData = {
    email: req.body.mail,
    name: req.body.name,
    surname: req.body.surname
  }

  try{
    mailchimpSubscribe(userData)
    res.status(200).send({status: 'OK'})
  } catch(err){
    return res.status(err.status).send(err.toString())
  }
})

export default router