require('dotenv').config()

const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const axios = require('axios')

const app = express()

const port = process.env.APP_PORT || 3000

app.use(cors())

app.use(bodyParser.json())

app.post('/relay', async (req, res) => {
  const urls = req.query.urls.map(url => decodeURI(url))

  await Promise.all(urls.map(url => axios.post(url, req.body)))
  res.end('Requests transfered!')
})

app.listen(port, () => {
  console.log(`Started listening on http://localhost:${port}`)
})