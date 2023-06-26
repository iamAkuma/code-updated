const mongoose = require('mongoose');
const mongoURI =
  'mongodb+srv://saralbjr:Vtkg0cpTFrAwQr8a@cluster0.psxdrlw.mongodb.net/DrinkMandu?retryWrites=true&w=majority';

const MongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const fetchedData = await mongoose.connection.db.collection("drink_items").find({}).toArray();
    const drinkCategory = await mongoose.connection.db.collection("beverage_category").find({}).toArray();
    
    global.drink_items = fetchedData;
    global.drink_category = drinkCategory;

    // Start your application logic here
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = MongoDB;
