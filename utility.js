const axios = require('axios'); // for making http requests
const apikey = process.env.API_KEY; // api key for the newsAPI

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

module.exports = {
    getNews: getNews,
    getNewsHeadlines: getNewsHeadlines,
}