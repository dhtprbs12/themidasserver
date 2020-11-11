const API_KEY = require("../../auth/apiKeyAdjusted");
const fetch = require("node-fetch");
const COMPANY_CURRENT_PRICE_API_CALL = require('../currentPrice/currentPrice')

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

function extractValues(json, symbol) {

  // const currentPrice = await COMPANY_CURRENT_PRICE_API_CALL.COMPANY_CURRENT_PRICE_API_CALL(symbol)

  const actualPER = Math.abs(currentPrice / EPS)
  const PER = json['PERatio']
  const EPS = json['EPS']

  const PBR = json['PriceToBookRatio']
  const BPS = json['BookValue']


  const shortTerm = Math.abs((PER * EPS).toFixed(2))
  const longTerm = Math.abs((PBR * BPS).toFixed(2))

  const isNonSensePER = (PER > (actualPER + 5)) || (PER < (actualPER - 5))

  if (PER === 'None' || PER === '0' || PER === 0 || isNonSensePER) {
    return { currentPrice: Number(0), shortTerm: null, longTerm: longTerm }
  }
  return { currentPrice: 0, shortTerm: shortTerm, longTerm: longTerm }
}

const COMPANY_ANALYSIS_API_CALL = (symbol) => {
  const API_CALL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;
  // returning fetch here means returning Promise, so we need await from caller
  return fetch(API_CALL)
    .then(async res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return extractValues(await res.json(), symbol)
    })
    .catch(err => {
      throw new Error(err)
    })

  // const response = await fetch(API_CALL);

  // if (!response.ok) {
  //   throw new Error(response.statusText);
  // }

  // const json = await response.json()

  // const currentPrice = await COMPANY_CURRENT_PRICE_API_CALL.COMPANY_CURRENT_PRICE_API_CALL(symbol)

  // const actualPER = Math.abs(currentPrice / EPS)
  // const PER = json['PERatio']
  // const EPS = json['EPS']

  // const PBR = json['PriceToBookRatio']
  // const BPS = json['BookValue']


  // const shortTerm = Math.abs((PER * EPS).toFixed(2))
  // const longTerm = Math.abs((PBR * BPS).toFixed(2))

  // const isNonSensePER = (PER > (actualPER + 5)) || (PER < (actualPER - 5))

  // if (PER === 'None' || PER === '0' || PER === 0 || isNonSensePER) {
  //   return { currentPrice: Number(currentPrice), shortTerm: null, longTerm: longTerm }
  // }
  // return { currentPrice: currentPrice, shortTerm: shortTerm, longTerm: longTerm }
};

module.exports = { COMPANY_ANALYSIS_API_CALL };
