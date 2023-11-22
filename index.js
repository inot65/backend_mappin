const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const pinRoutes = require('./routes/pins');

dotenv.config();

const app = express();

// pentru a putea vedea body-ul din request
app.use(express.json());

// conexiunea la MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Conectat la MongoDB!');

    // setez rutele
    app.use('/api/users', userRoutes);
    app.use('/api/pins', pinRoutes);

    // pornesc serverul
    app.listen(8800, () => {
      console.log('Backend-ul ruleaza pe portul 8800...');
    });
  })
  .catch((error) => {
    console.log(error);
  });
