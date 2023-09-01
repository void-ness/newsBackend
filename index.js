require('dotenv').config(); // for loading env variables

const utility = require('./utility.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// to get viral news on the basis of entered keywords or category wise
app.get('/viralNews', async (req, res) => {
    const query = req.query;

    try {
        const msg = await utility.getNews(query.keyword);
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
        const msg = await utility.getNewsHeadlines(query.country, query.page, query.pageSize);
        res.status(200).json(msg);
    }

    catch (error) {
        res.status(500).json({ error: 'failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`server listening on https://localhost:${port}`);
})