const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    
  return Recipe.insertMany(data)
        .then(() => {
    console.log(`${data.title} was created`);
    
  return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
        .then((updatedRecipe) => {
        console.log(`Recipe got updated ${updatedRecipe}`);
  
  return Recipe.deleteOne({name: 'Carrot Cake'})
        .then((resultFromDeletedOne) => {
          console.log(`Ops! Recipe got deleted ${resultFromDeletedOne} `)
    
    mongoose.connection.close();
    
        });      
  
    
      });

})
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

 /*Recipe.create({
    title: 'Ninja Pizza',
    level: 'Easy Peasy',
    ingredients: 'everything you want',
    cuisine: 'italian',
    dishType: 'pasta',
    }).then((response) => {
    console.log('Recipe Created', response);
  }).catch((err) => {
    console.log('Something is burning', err);
  });*/

