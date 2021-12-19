const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const PORT = 9080
const app = express()

const newspapers = [
    {
        name: 'Times of India',
        address: 'https://timesofindia.indiatimes.com/topic/climate%20change',
        baseAddress: 'https://timesofindia.indiatimes.com'
    },
    {
        name: 'India Today',
        address: 'https://www.indiatoday.in/topic/climate-change',
        baseAddress: 'https://www.indiatoday.in'
    },
    {
        name: 'The Hindu',
        address: 'https://www.thehindu.com/sci-tech/energy-and-environment',
        baseAddress: 'https://www.thehindu.com'
    },
    {
        name: 'Hindustan Times',
        address: 'https://www.hindustantimes.com/ht-insight/climate-change',
        baseAddress: 'https://www.hindustantimes.com'
    },
    {
        name: 'Newslaundry',
        address: 'https://www.newslaundry.com/reports',
        baseAddress: 'https://www.newslaundry.com'
    }
]

const keyword = 'climate'

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $(`a:contains(${keyword})`, html).each(function () {
                const title = $(this).text();
                let url = $(this).attr('href')

                if (!url.startsWith('http') || !url.startsWith('https')) {
                    url = newspaper.baseAddress + url
                }
                articles.push({
                    title,
                    url,
                    source: newspaper.name
                })
            })
        }).catch(err => console.log(err))
})

function removeDuplicateObjFromArrObj(arrObj) {
    let arrStr = arrObj.map(obj => JSON.stringify(obj))
    let arrSetStr = Array.from(new Set(arrStr))     // OR [...new Set(arrStr)]
    let arrSetObj = arrSetStr.map(data => JSON.parse(data))
    return arrSetObj;
    // return Array.from(new Set(arrObj.map(obj => JSON.stringify(obj)))).map(data => JSON.parse(data));
    // return [...new Set(listObj.map(obj => JSON.stringify(obj)))].map(data => JSON.parse(data));
}

app.get('/', (req, res) => {
    res.json('Welcome to Climate Change News API')
})

app.get('/news', (req, res) => {
    // To remove duplicate object from an array-of-object
    let articlesData = removeDuplicateObjFromArrObj(articles)
    res.json(articlesData)
})

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
