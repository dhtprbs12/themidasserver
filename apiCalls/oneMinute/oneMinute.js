const API_KEY = require("../../auth/apiKeyAdjusted");
const fetch = require("node-fetch");

/* Promise 를 리턴하면 then을 쓸수 있음
await 은 Promise 가 resolved 되어서 결과값이 넘어 올 때까지 기다리는 명령어 

Example
async function myFunc(){
    await thisFunctionWillReturnPromiseObjectAfter3sec(3)
    return 'hello';
}
-> 3초 후에 hello
하지만,
async function myFunc(){
    thisFunctionWillReturnPromiseObjectAfter3sec(3)
    return 'hello';
}
-> hello 찍고 3초뒤 thisFunctionWillReturnPromoseObjectAfter3sec(3) 실행
*/
const ONE_MINUTE_API_CALL = async (symbol, min, outputSize) => {
	/*
    Or, we can do
    async function getUserAsync(name) 
    {
        await fetch(`https://api.github.com/users/${name}`).then(async (response)=> {
        return await response.json()
    }
    */

	const API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${min}min&outputsize=${outputSize}&apikey=${API_KEY}`;

	const response = await fetch(API_CALL);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const array = [];
	const json = await response.json();

	for (var key in json[`Time Series (${min}min)`]) {
		const obj = {
			date: key,
			open: json[`Time Series (${min}min)`][key]["1. open"],
			high: json[`Time Series (${min}min)`][key]["2. high"],
			low: json[`Time Series (${min}min)`][key]["3. low"],
			close: json[`Time Series (${min}min)`][key]["4. close"],
			volume: json[`Time Series (${min}min)`][key]["5. volume"]
		};
		array.push(obj);
	}
	return array.reverse();
};

module.exports = { ONE_MINUTE_API_CALL };
