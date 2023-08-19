// require() is an in-built function to import modules
const express = require('express');

// create an instance of express
const app = express();

// middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

let books = [
	{
		id: 1,
		title: 'book 1',
		author: 'author 1',
	},
	{
		id: 2,
		title: 'book 2',
		author: 'author 2',
	},
];

// GET method
app.get('/books', (req, res) => {
	res.json(books);
});

// POST method
app.post('/books', (req, res) => {
	const newBook = {
		id: books.length + 1,
		title: req.body.title,
		author: req.body.author,
	};
    books.push(newBook);
    res.json(books);
});

// create a server using express
// listen() is an in-built function of express that takes PORT & a callback function
app.listen(3000, () => {
	console.log('Server is live');
});
