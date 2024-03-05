const mongoose = require("mongoose")



const connectToMongo = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/personalnote');
      console.log('Connected to MongoDB Successfully');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
    }
  };

module.exports = connectToMongo;