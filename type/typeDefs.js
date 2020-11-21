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
	type Feedback {
		id: String
		firstName: String
		lastName: String
		email: String
		feedback: String
		title: String
		createdAt: String
	}
	type Query {
		companies(type: String!, id: Int!, industry: String!): [Company]
		autoCompleteCompanies(name: String!): [Company]
		feedbacks(id: Int): [Feedback]
	}
	type Mutation {
		createFeedback(firstName: String!, lastName: String!, email: String!, feedback: String!, title: String!): String
	}
`