// require() is an in-built function to import modules
const express = require('express');
const names = require('./data');

// create an instance of express
const app = express();

// using middlewares

// these routing functions take 2 arguements
// 1. path
// 2. callback function that takes request & response
app.get('/', (req, res) => {
	res.send('Home');
});

app.get('/about', (req, res) => {
	res.send('about');
});

// create a server using express
// listen() is an in-built function of express that takes PORT & a callback function
app.listen(3000, () => {
	console.log('Server is live');
});
