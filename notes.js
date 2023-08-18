// require() is an in-built function to import modules
const express = require('express');
const path = require('path');

// create an instance of express
const app = express();

// these routing functions take 2 arguements
// 1. path
// 2. callback function that takes request & response
app.get('/', (req, res) => {
	// sends the HTTP response
	res.send('Server is running');
});

app.get('/contact', (req, res) => {
	res.send('YOU ARE ON CONTACT ROUTE');
});

app.get('/file', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/json', (req, res) => {
	res.json({
		name: 'Kaustubh',
	});
});

app.all('*', (req,res) => {
    res.send('THIS PAGE DOES NOT EXIST')
})

// create a server using express
// listen() is an in-built function of express that takes PORT & a callback function
app.listen(3000, () => {
	console.log('Server is live');
});
