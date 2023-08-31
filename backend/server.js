const express = require('express');
// const cors = require('cors');
const dotenv = require('dotenv');

const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const { notFound } = require('./middlewares/notFound');
const { handleStatusCodeError } = require('./middlewares/statusCode');

const colors = require('colors')
const { chats } = require('./constants/index');

const app = express();

dotenv.config();
connectDB();

PORT = process.env.PORT || 5001;

// allows express to accept JSON data
app.use(express.json());

// app.use(cors());

app.get('/', (req, res) => {
    res.send("API is running...")
})

app.get('/api/chat', (req, res) => {
    res.send(chats);
})

app.get('/api/chat/:id', (req, res) => {
    // returns the id of the request.
    // console.log(req.params.id);

    // to return a single chat
    singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
})

app.use('/api/user', userRoutes);

// error handling middlewares
app.use(notFound);
app.use(handleStatusCodeError);

app.listen(PORT, console.log(`server is running on port http://localhost:${PORT}`.yellow.underline));
