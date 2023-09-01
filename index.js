require('dotenv').config(); // for loading env variables

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // for making http requests

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const apikey = process.env.API_KEY; // api key for the newsAPI

// to get viral news on the basis of entered keywords or category wise
app.get('/viralNews', async (req, res) => {
    const query = req.query;
    console.log(query);

    try {
        const msg = await getNews(query.keyword);
        res.status(200).json(msg);
    }

    catch (error) {
        res.status(500).json({ error: 'failed to fetch data' });
    }
});

// to get viral headlines of a particular country
app.get('/viralHeadlines', async (req, res) => {
    const query = req.query;

    try {
        const msg = await getNewsHeadlines(query.country, query.page, query.pageSize);
        res.status(200).json(msg);
    }

    catch (error) {
        res.status(500).json({ error: 'failed to fetch data' });
    }
});

// function to fetch news of a particular topic and category wise news
async function getNews(keyword) {
    try {
        const params = {
            params: {
                sortBy: 'relevancy',
                searchIn: 'title,description',
                language: 'en',
                page: 1,
                pageSize: 6,
                apikey: apikey,
                q: keyword
            }
        }

        let result = await axios.get(`https://newsapi.org/v2/everything`, params);
        return result.data?.articles;
    }

    catch (error) {
        throw new Error("unable to fetch results from the API");
    }
}

// function to fetch headlines of a particular country
async function getNewsHeadlines(countryName = "in", page = 1, pageSize = 6) {
    try {
        const params = {
            params: {
                sortBy: 'relevancy',
                page: page,
                pageSize: pageSize,
                apikey: apikey,
                country: countryName
            }
        }

        let result = await axios.get(`https://newsapi.org/v2/top-headlines`, params);
        return result.data?.articles;
    }

    catch (error) {
        throw new Error("unable to fetch results from the API");
    }
}

app.listen(port, () => {
    console.log(`server listening on https://localhost:${port}`);
})