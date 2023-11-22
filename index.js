const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const pinRoutes = require('./routes/pins');
const cors = require('cors');

dotenv.config();

const app = express();

// pentru a putea vedea body-ul din request
app.use(express.json());

// folosesc CORS
app.use(cors());

// ce fac la conectare/deconectare MongoDB
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB deconectat...');
});
mongoose.connection.on('connected', () => {
  console.log('Conectat la baza de date!');
});

// functie de conectare la MongoDB Atlas
const conectareMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

// setez rutele
app.use('/api/users', userRoutes);
app.use('/api/pins', pinRoutes);

const PORT = 8800;

try {
  app.listen(PORT, () => {
    console.log(`API listening on PORT ${PORT}`);
  });
  // conectare la baza de date
  conectareMongoDb();

  app.get('/', (req, res) => {
    res.send('Hey this is my API for MAPPIN running 🥳 ');
  });
} catch (error) {
  console.log(error);
}

// Export the Express API
module.exports = app;
