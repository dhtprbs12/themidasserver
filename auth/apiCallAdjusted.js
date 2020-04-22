const API_KEY = require('./apiKeyAdjusted')

export function API_CALL_ADJUSTED(){
    const stockArr = [];

    https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo

    const API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;

    const response = await fetch(API_CALL)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return Promise.resolve(res.json());
        })
        .catch(err => {
            return Promise.reject(err);
        });

    if (response["Time Series (Daily)"] !== undefined) {
        for (var key in response["Time Series (Daily)"]) {
            const obj = {
                date: key,
                open: response["Time Series (Daily)"][key]["1. open"],
                high: response["Time Series (Daily)"][key]["2. high"],
                low: response["Time Series (Daily)"][key]["3. low"],
                close: response["Time Series (Daily)"][key]["4. close"]
            };
            stockArr.push(obj);
        }
        return stockArr.reverse();
    }
}