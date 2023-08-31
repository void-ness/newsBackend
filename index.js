require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;
const apikey = process.env.API_KEY;

app.get('/', async (req, res) => {
    try {
        const msg = await getNews();
        // console.log(msg);
        res.status(200).json(msg);
        // throw new Error("demo");
    }

    catch (error) {
        res.status(500).json({ error: 'failed to fetch data' });
    }

});

// function to fetch news of a particular topic
async function getNews() {
    try {
        const params = {
            params: {
                sortBy: 'relevancy',
                searchIn: 'title,description',
                language: 'en',
                page: 1,
                pageSize: 1,
                apikey: apikey,
                q: 'india'
            }
        }

        let result = await axios.get(`https://newsapi.org/v2/everything`, params);
        return result.data?.articles;
    }

    catch (error) {
        throw new Error("unable to fetch results from the API");
    }

}

app.listen(port, () => {
    console.log(`server listening on https://localhost:${port}`);
})