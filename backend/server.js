const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data/data');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use('/api/v1/user', userRoutes);
app.get('/', (req, res) => {
  res.send('This is an API BIJU');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server started');
});
