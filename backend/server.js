const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data/data');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/error');
const messageRoutes = require('./routes/messageRoutes');
dotenv.config();

connectDB();

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/message', messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server started');
});
