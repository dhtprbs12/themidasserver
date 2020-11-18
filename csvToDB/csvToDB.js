const fs = require('fs')
const neatCsv = require('neat-csv')
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '',
  database: "STOCK",
});

function temp() {
  fs.readFile(__dirname + "/constituents-financials.csv", async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let list = await neatCsv(data);
    for (var i = 0; i < list.length; i++) {
      let symbol = list[i].Symbol;
      let name = list[i].Name;
      let industry = list[i].Sector;
      let description = list[i].industry;

      await connection.query(
        `insert into SP500 (symbol,name,industry,description) values (?,?,?,?)`,
        [symbol, name, industry, description],

        function (err, res) {
          if (err) {
            console.log(`Error while inserting ${name} ------ ${err}`);
          } else {
            console.log(`Succeeded while inserting ${name} ------ ${res}`);
          }
        }
      );
    }
  });
}

module.exports = { temp }
