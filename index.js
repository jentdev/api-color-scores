const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// export function to connect to mongodb
const connectDB = require('./config/db');

// load config
dotenv.config({ path: './config/config.env'});

connectDB();

// db.on('error', (err) => console.error(err));
// db.once('connected', () => console.log(`connect to db.`));

const app = express();

// middleware
app.use(express.json()); // accept json as body

// routes
app.use('/scores', require('./routes/scores'));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));