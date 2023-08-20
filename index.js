const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes')

app.use(express.json());
app.use('/', bookRoutes)



app.listen(3000, () => {
	console.log('Server is live');
});
