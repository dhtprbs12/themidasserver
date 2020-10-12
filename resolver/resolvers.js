const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: '',
	database: "STOCK",
});

connection.connect((err) => {
	if (err) {
		return err;
	}
});

companies = []
module.exports = {
	Query: {
		// should declare parent to get argument args.kind. 
		// don't know why tho
		companies: (parent, args) => {
			console.log(`Query: companies: ${JSON.stringify(args)}`)
			return new Promise((resolve, reject) => {
				connection.query(
					`select * from ${args.type} where id > ${args.id} and industry='${args.industry}' limit 0, 10`, function (err, res) {
						if (err) {
							console.log(`Error while selecting from ${args.type} -- ERROR: ${err}`);
							reject(err)
						} else {
							console.log(`Succeeded while selection from ${args.type}`);
							resolve(JSON.parse(JSON.stringify(res)))
						}
					}
				);
			})
		},
		autoCompleteCompanies: (parent, args) => {
			console.log(`Query: autoCompleteCompanies: ${JSON.stringify(args)}`)
			const name = args.name
			return new Promise((resolve, reject) => {
				connection.query(
					`select * from AMEX  where name LIKE '${name}%'
						union select * from NASDAQ where name LIKE '${name}%'
						union select * from NYSE where name LIKE '${name}%'
						union select * from SP500 where name LIKE '${name}%';`, function (err, res) {
					if (err) {
						console.log(`Error while selecting with UNION '${name}' -- ERROR: ${err}`);
						reject(err)
					} else {
						console.log(`Succeeded while selecting with UNION '${name}'`);
						resolve(JSON.parse(JSON.stringify(res)))
					}
				}
				);
			})
		},
		feedbacks: (parent, args) => {
			console.log(`Query: getFeedbacks: ${JSON.stringify(args)}`)
			const id = args.id
			return new Promise((resolve, reject) => {
				connection.query(
					`select * from FEEDBACK limit 0, 100`, function (err, res) {
						if (err) {
							console.log(`Error while getting FEEDBACK -- ERROR: ${err}`);
							reject(err)
						} else {
							console.log(`Succeeded while getting FEEDBACK ${JSON.stringify(res)}`);
							resolve(JSON.parse(JSON.stringify(res)))
						}
					}
				);
			})
		},
	},
	Mutation: {
		createFeedback: (parent, args) => {
			console.log(`Mutation: createFeedback: ${JSON.stringify(args)}`)
			const firstName = args.firstName
			const lastName = args.lastName
			const email = args.email
			const feedback = args.feedback
			const query = 'insert into FEEDBACK (firstName, lastName, email, feedback) values (?,?,?,?)'
			return new Promise((resolve, reject) => {
				connection.query(query, [firstName, lastName, email, feedback], function (err, res) {
					if (err) {
						console.log(`Error while createFeedback -- ERROR: ${err}`);
						reject(err)
					} else {
						console.log(`Succeeded while createFeedback`);
						resolve('SUCCESS')
					}
				})
			})
		}
	}
};