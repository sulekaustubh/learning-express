// require() is an in-built function to import modules
const express = require('express');
const names = require('./data');

// create an instance of express
const app = express();

// these routing functions take 2 arguements
// 1. path
// 2. callback function that takes request & response

app.get('/query', (req, res) => {
	// clone the array 'names' and store it in new variable
	let sortedQuery = [...names];
	// destructure to extract search
	const { search } = req.query;

	// if any specific query parameter exists
	if (search) {
		sortedQuery = sortedQuery.filter((i) => {
			return i.fname[0].toLowerCase() == search;
			// return i;
		});
	}

	res.json(sortedQuery);
});

// create a server using express
// listen() is an in-built function of express that takes PORT & a callback function
app.listen(3000, () => {
	console.log('Server is live');
});
