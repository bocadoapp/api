import express from 'express'
import axios from 'axios'

const router = express.Router()
const { LOCALISE_KEY } = process.env
const localeMap: any = {
  ca: 'ca-ES',
  es: 'es-ES'
}

router.get('/:locale', (req, res) =>
  axios.get(`https://localise.biz/api/export/locale/${localeMap[req.params.locale]}.json?key=${LOCALISE_KEY}`)
    .then(({ data }) => res.send(data))
)

export default router
