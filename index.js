require('dotenv').config()

const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const axios = require('axios')

const app = express()

const port = process.env.APP_PORT || 3000

app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.get('/healthz', (req, res) => {
  res.status(200).send('OK')
})

app.post('/relay', async (req, res) => {
  if (!req.query.urls) {
    res.status(400).send('No `urls[]` param found, please check your configuration.')
  }
  if (!req.body.payload) {
    res.status(400).send('Could not parse `body.payload`. Check you\'ve setup your integration correctly.')
  }
  const urls = req.query.urls.map(url => decodeURI(url))

  
  await Promise.all(urls.map(url => axios.post(url, req.body.payload, { headers: req.headers })))
    .catch((e) => {
      console.log(e)
      console.log(e.response)
      res.status(500).send('Failed to transfer request (see errors above)!')
  })
  res.status(200).send('Requests transfered!')
})

app.listen(port, () => {
  console.log(`Started listening on http://localhost:${port}`)
})