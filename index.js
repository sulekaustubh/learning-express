const express = require('express');
const app = express();

// middlewares
app.use(express.json());

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

app.get('/books', (req, res) => {
	res.json(books);
});

app.post('/books', (req, res) => {
	const newBook = req.body;
	newBook.id = books.length + 1;
	books.push(newBook);
	res.status(201).json(books);
});

app.listen(3000, () => {
	console.log('Server is live');
});
