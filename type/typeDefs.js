const { gql } = require("apollo-server-express")

module.exports = gql`
	type Company {
		id: String
		symbol: String
		name: String
		industry: String
		description: String
		mission: String
	}
	type Query {
		companies(type: String!, id: Int!, industry: String!): [Company]
		autoCompleteCompanies(name: String!): [Company]
	}
`


// const typeDefs = gql`
// 	type Todo {
// 		id: String
// 		text: String
// 		completed: Boolean
// 	}
// 	type Query {
// 		todos: [Todo]!
// 	}
// 	type Mutation {
// 		createTodo(text: String!): String
// 		removeTodo(id: String!): String
// 	}
// `;