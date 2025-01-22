const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user.routes');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRoutes);

module.exports = app;