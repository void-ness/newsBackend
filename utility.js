const apikey = process.env.API_KEY;

export function getWeather() {
    const result = fetch(`https://newsapi.org/v2/everything?q=world&apikey=${apikey}`).then((res) => res.json)

    return result
}

