const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const username = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const dbname = process.env.DB_NAME;

    const uri = `mongodb+srv://${username}:${password}@hack.3kf7ogr.mongodb.net/${dbname}?retryWrites=true&w=majority`;
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on('error', err => {
      console.error('Erreur de connexion MongoDB:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB déconnecté');
    });

    console.log(`MongoDB connecté: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erreur de connexion: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;