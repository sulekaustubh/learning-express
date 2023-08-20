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

app.put('/books/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const updatedBook = req.body;
	const index = books.findIndex((book) => book.id === id);

	// if book exists
	if (index !== -1) {
		books[index] = { ...books[index], ...updatedBook };
		res.json(books[index]);
	} else {
		res.status(404).json({ error: 'Book not found' });
	}
});

app.delete('/books/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        const deletedBook = books[index];
        books.splice(index, 1)
        res.json(deletedBook)
    }
    else {
        res.status(404).json({error: 'Book not found'})
    }
});

app.listen(3000, () => {
	console.log('Server is live');
});
