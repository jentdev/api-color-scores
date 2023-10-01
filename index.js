require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// middleware
app.use(express.json()); // accept json as body

// routes
app.use('/scores', require('./routes/scores'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
})