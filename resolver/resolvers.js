const mysql = require("mysql");
const DB_PASSWORD = require("../auth/dbPassword");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: DB_PASSWORD,
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
			console.log(`Query: companies: ${args}`)
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
			console.log(`Query: autoCompleteCompanies: ${args}`)
			const name = args.name
			return new Promise((resolve, reject) => {
				connection.query(
					`select * from AMEX  where name LIKE '${name}%'
						union select * from NASDAQ where name LIKE '${name}%'
						union select * from NYSE where name LIKE '${name}%'
						union select * from SP500 where name LIKE '${name}%';`, function (err, res) {
					if (err) {
						console.log(`Error while selecting with UNION ${name} -- ERROR: ${err}`);
						reject(err)
					} else {
						console.log(`Succeeded while selecting with UNION${name}`);
						resolve(JSON.parse(JSON.stringify(res)))
					}
				}
				);
			})
		},
	},
};

// const resolvers = {
// 	Query: {
// 		todos: () => todos,
// 	},
// 	Mutation: {
// 		createTodo: (parent, args, context, info) => {
// 			return todos.push({
// 				id: Date.now().toString(),
// 				text: args.text,
// 				completed: false,
// 			});
// 		},
// 		removeTodo: (parent, args, context, info) => {
// 			for (let i in todos) {
// 				if (todos[i].id === args.id) {
// 					todos.splice(i, 1);
// 				}
// 			}
// 			return args.id;
// 		},
// 	},
// };