require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
const PORT = process.env.PORT;

db.on('error', (err) => console.error(err));
db.once('listen', () => console.log(`connect to db.`));

// middleware - codes run when server gets a request, but before it get passed to your routes 
app.use(express.json()); // accept json as a body

// routes
app.use('/scores', require('./routes/scores'));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));