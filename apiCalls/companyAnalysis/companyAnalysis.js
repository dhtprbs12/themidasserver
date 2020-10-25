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
const COMPANY_ANALYSIS_API_CALL = async (symbol) => {
  /*
    Or, we can do
    async function getUserAsync(name) {
        await fetch(`https://api.github.com/users/${name}`).then(async (response)=> {
        return await response.json()
    }
    */

  /* compact: 100 historical data of day
     full: 20+ years historical data of day
  */

  const API_CALL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;

  const response = await fetch(API_CALL);

  if (!response.ok) {
    throw new Error(response.statusText);
  }


  const json = await response.json();
  const PER = json['PERatio']
  const EPS = json['EPS']

  const PBR = json['PriceToBookRatio']
  const BPS = json['BookValue']

  return { shortTerm: (PER * EPS).toFixed(2), longTerm: (PBR * BPS).toFixed(2) }
};

module.exports = { COMPANY_ANALYSIS_API_CALL };
