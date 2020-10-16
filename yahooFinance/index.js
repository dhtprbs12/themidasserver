const request = require('request');


const options = {
  method: 'GET',
  url: 'https://rapidapi.p.rapidapi.com/stock/v2/get-analysis',
  qs: { symbol: 'AMRN', region: 'US' },
  headers: {
    'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    'x-rapidapi-key': 'd9224d2208msh938a1af5d75312bp1ad84fjsn0a629c09bd97',
    useQueryString: true
  }
};

function getOptions(symbol) {
  return {
    method: 'GET',
    url: 'https://rapidapi.p.rapidapi.com/stock/v2/get-analysis',
    qs: { symbol: symbol, region: 'US' },
    headers: {
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      'x-rapidapi-key': 'd9224d2208msh938a1af5d75312bp1ad84fjsn0a629c09bd97',
      useQueryString: true
    }
  }
}

async function GET_COMPANY_ANALYSIS(symbol) {
  const options = getOptions(symbol)
  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) {
        reject(error)
      } else if (response.statusCode !== 200) {
        reject(new Error(`Error HTTP ${response.statusCode}`))
      } else {
        resolve(body)
      }
    });
  })

}

module.exports = { GET_COMPANY_ANALYSIS }
