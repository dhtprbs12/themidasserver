const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");


const typeDefs = require('./type/typeDefs')
const resolvers = require('./resolver/resolvers')

const INTRA_DAILY_API_CALL = require('./apiCalls/oneMinute/oneMinute')
const DAILY_API_CALL = require('./apiCalls/daily/daily')
const WEEKLY_API_CALL = require('./apiCalls/weekly/weekly')
const MONTHLY_API_CALL = require('./apiCalls/monthly/monthly')
const YEARLY_API_CALL = require('./apiCalls/yearly/yearly')
const FIVE_YEAR_API_CALL = require('./apiCalls/fiveYear/fiveYear')
const TWENTY_YEAR_API_CALL = require('./apiCalls/twentyYear/twentyYear')

const app = express();

app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.get("/intradaily/:symbol", (req, res) => {
	const symbol = req.params.symbol

	INTRA_DAILY_API_CALL.ONE_MINUTE_API_CALL(symbol, '5', 'compact')
		.then(data => res.send(data))
		.catch(err => res.status.send({ message: err }))
});

app.get("/daily/:symbol", (req, res) => {
	const symbol = req.params.symbol

	DAILY_API_CALL.DAILY_API_CALL(symbol)
		.then(data => res.send(data))
		.catch(err => res.status.send({ message: err }))
});

app.get("/weekly/:symbol", (req, res) => {
	const symbol = req.params.symbol

	WEEKLY_API_CALL.WEEKLY_API_CALL(symbol, '5', 'full')
		.then(data => res.send(data))
		.catch(err => res.status.send({ message: err }))
});

app.get("/monthly/:symbol/:month", (req, res) => {
	const symbol = req.params.symbol
	const month = req.params.month
	MONTHLY_API_CALL.MONTHLY_API_CALL(symbol, 'full', month)
		.then(data => res.send(data))
		.catch(err => res.status.send({ message: err }))
});

app.get("/yearly/:symbol", (req, res) => {
	const symbol = req.params.symbol
	YEARLY_API_CALL.YEARLY_API_CALL(symbol, 'full')
		.then(data => res.send(data))
		.catch(err => res.status.send({ message: err }))
});

app.get("/five-yearly/:symbol", (req, res) => {
	const symbol = req.params.symbol
	FIVE_YEAR_API_CALL.FIVE_YEAR_API_CALL(symbol, 'full')
		.then(data => res.send(data))
		.catch(err => res.status.send({ message: err }))
});

app.get("/over-twenty-year/:symbol", (req, res) => {
	const symbol = req.params.symbol
	TWENTY_YEAR_API_CALL.TWENTY_YEAR_API_CALL(symbol)
		.then(data => res.send(data))
		.catch(err => res.status.send({ message: err }))
});

app.listen({ port: 4000 }, () => {
	console.log("The Midas server listening on port 4000");
});
