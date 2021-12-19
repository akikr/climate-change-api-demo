const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const PORT = 9080
const app = express()
const articles = []

app.get('/', (req, res) => {
   res.json('Welcome to Climate Change News API')
})

app.get('/news', (req, res) => {

   axios.get('https://www.theguardian.com/environment/climate-crisis')
       .then((response) => {
           const html = response.data
           const $ = cheerio.load(html)

           $('a:contains("climate")', html).each(function () {
               const title = $(this).text();
               const url = $(this).attr('href')
               articles.push({
                   title,
                   url
               })
           })
           res.json(articles)
       }).catch((err) => console.log(err))
})

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
