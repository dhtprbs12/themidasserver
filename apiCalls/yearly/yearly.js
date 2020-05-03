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
const YEARLY_API_CALL = async (symbol, outputSize) => {
	/*
    Or, we can do
    async function getUserAsync(name) {
        await fetch(`https://api.github.com/users/${name}`).then(async (response)=> {
        return await response.json()
    }
    */

	const API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=${outputSize}&apikey=${API_KEY}`;

	const response = await fetch(API_CALL);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const array = [];
	const ONE_YEAR_AGO_DATE = new Date(
		new Date().setFullYear(new Date().getFullYear() - 1)
	);
	const json = await response.json();

	for (var key in json["Time Series (Daily)"]) {
		var date = new Date(key);

		if (date.getTime() >= ONE_YEAR_AGO_DATE.getTime()) {
			const obj = {
				date: key,
				open: json["Time Series (Daily)"][key]["1. open"],
				high: json["Time Series (Daily)"][key]["2. high"],
				low: json["Time Series (Daily)"][key]["3. low"],
				close: json["Time Series (Daily)"][key]["4. close"],
			};
			array.push(obj);
		}
	}

	return array.reverse();
};

module.exports = {
	YEARLY_API_CALL
};