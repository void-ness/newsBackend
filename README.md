## Viral News Backend
ViralNews is a mobile app which is used to serve daily news from a variety of sources. With features ranging from viewing top headlines by country to searching about a particular topic, the app serves as a central interface for all such needs.

The above code is used to provide APIs for the viralNews mobile App.

## TechStack
1. **Frontend** - Retool mobile app
2. **Backend** - Node.js with Express
3. **API Service** - newsapi.org

## Installation
1. install all the dependenices
```bash
    npm install
```

2. run the local server
```bash
    npm run start
```

A local server will be started on the PORT - 3000

**Note**: In order to fetch data from the newsAPI, you will need an API key. you can get the same by creating an account on their website. After that, you can add the API key in your `.env` file. `example.env` file contains the format to be followed.

## API Endpoints

### /viralNews
- Method - GET 
- Parameters -
    - keyword - a string value equal to the topic you need to search about.
- Description - Returns an array of objects of news articles related to the given keyword

### /viralHeadlines
- Method - GET 
- Parameters -
    - country - a string value equal to the country name.
    - page - an integer value equal to the page number you want to access
    - pageSize - an integer value equal to the number of records to be returned in a single page
- Description - Returns an array of objects of top news headlines related to a given country

## Example Response
```json
    [
        {
            "source": {
                "id": "",
                "name": ""
            },
            "author": "",
            "title" : "",
            "description" : "",
            "url" : "",
            "urlToImage": "",
            "publishedAt": "",
            "content": ""
        }
    ]
```