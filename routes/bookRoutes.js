const express = require('express');

// import bookController
const bookController = require('../controllers/bookController');

// extract router from express and create a new instance
const router = express.Router();

router.get('/books', bookController.getBooks);

router.post('/books', bookController.createBook);

router.put('/books/:id', bookController.updateBook);

router.delete('/books/:id', bookController.deleteBook);

module.exports = router;