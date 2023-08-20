// require() is an in-built function to import modules
const express = require('express');
const path = require('path');

// create an instance of express
const app = express();
// ---------------------------------------------------------------------


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
// ---------------------------------------------------------------------


// rendering specific properties of the response object
app.get('/', (req, res) => {
	const filter = names.map((i) => {
		// destructuring to extract and separate object properties
        const { fname, lname } = i;
        // render specific property
        return { fname };
	});
	res.json(filter);
});
// --------------------------------------------------------------------------------------------


// parameter based routing using .find()
app.get('/:id', (req, res) => {
	const { id } = req.params;
	const singleName = names.find((i) => i.id === Number(id));
	
	if (!singleName) {
		res.status(404).send('Does Not Exist');
	}
	
	res.json(singleName);
});
// --------------------------------------------------------------------------------------------

// query based routing using .filter()
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
// --------------------------------------------------------------------------------------------


// defining custom middlewares
// they take 3 arguements: req, res and the next middleware to call
const logger = (req, res, next) => {
	console.log(
		` ${new Date()}, Request type: ${req.method}, URL path: ${req.url} `
	);
	next();
};

const logger2 = (req, res, next) => {
	console.log('mei dusra hu');
	next();
};

// using middlewares on specific path
app.use('/about', [logger, logger2]);
// --------------------------------------------------------------------------------------------


// POST method
// to use the index.html file inside 'public' folder as a static web app
app.use(express.static('public'));

// to parse the URL-encoded data
app.use(express.urlencoded({ extended: false }));

// sample data
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

app.post('/books', (req, res) => {
	const newBook = {
		id: books.length + 1,
		// upon form submission, req.body contains the values of our interest
		title: req.body.title,
		author: req.body.author,
	};
    books.push(newBook);
    res.json(books);
});

app.post('/books', (req, res) => {
	const newBook = req.body;
	newBook.id = books.length + 1;
	books.push(newBook);
	res.status(201).json(books);
});

// PUT request
// allows us to pass json when using thunderclient or postman
app.use(express.json());

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
// --------------------------------------------------------------------------------------------


// DELETE request
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
// --------------------------------------------------------------------------------------------

// create a server using express
// listen() is an in-built function of express that takes PORT & a callback function
app.listen(3000, () => {
	console.log('Server is live');
});
