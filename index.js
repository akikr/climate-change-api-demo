const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const PORT = 9080
const app = express()

app.get('/', (req, res) => {
   res.json('Welcome to Climate Change News API')
})

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
