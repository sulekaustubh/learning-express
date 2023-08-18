// require() is an in-built function to import modules
const express = require('express');
const names = require('./data');

// create an instance of express
const app = express();

// these routing functions take 2 arguements
// 1. path
// 2. callback function that takes request & response
app.get('/', (req, res) => {
    const filter = names.map((i) => {
        // destructuring to extract and separate object properties
        const { fname, lname } = i;
        // render specific property
        return { fname };
	});
	res.json(filter);
});

// create a server using express
// listen() is an in-built function of express that takes PORT & a callback function
app.listen(3000, () => {
	console.log('Server is live');
});
