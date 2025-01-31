const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')


// Connect to the database
connectToMongo();

const app = express();
const port = 5000;



app.use(cors())

const notesRoute = require('./routes/notes'); 

// Middleware to parse JSON request bodies
app.use(express.json());
app.use('/api/notes', notesRoute);

// Routes
app.use('/api/auth', require('./routes/auth'));


// Start the server
app.listen(port, () => {
    console.log(`iNotebook backend listening on http://localhost:${port}`);
});

