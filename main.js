// Import required modules
const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
  favoriteFoods: [{ type: String }]
});

// Create a Person Model
const Person = mongoose.model('Person', personSchema);

// Create a new person document and save it to the database
const person = new Person({
  name: 'John',
  age: 25,
  favoriteFoods: ['pizza', 'burger', 'sushi']
});

person.save(function(err, data) {
  if (err) return console.error(err);
  console.log('Person saved:', data);
});

// Create many people using Model.create()
const arrayOfPeople = [
  { name: 'Alice', age: 30, favoriteFoods: ['sushi', 'ramen'] },
  { name: 'Bob', age: 35, favoriteFoods: ['burger', 'fries'] },
  { name: 'Charlie', age: 40, favoriteFoods: ['pizza', 'pasta'] }
];

Person.create(arrayOfPeople, function(err, data) {
  if (err) return console.error(err);
  console.log('People created:', data);
});

// Use Model.find() to search for people by name
Person.find({ name: 'John' }, function(err, data) {
  if (err) return console.error(err);
  console.log('People found by name:', data);
});

// Use Model.findOne() to search for a person by favorite food
const food = 'burger';
Person.findOne({ favoriteFoods: food }, function(err, data) {
  if (err) return console.error(err);
  console.log(`Person found by favorite food "${food}":`, data);
});

// Use Model.findById() to search for a person by _id
const personId = '60dcd49c3e040b0019f6d8c7'; // Replace with valid _id
Person.findById(personId, function(err, data) {
  if (err) return console.error(err);
  console.log(`Person found by _id "${personId}":`, data);
});

// Perform classic updates by finding a person by _id, adding "hamburger" to their favoriteFoods, and saving the updated person
Person.findById(personId, function(err, person) {
  if (err) return console.error(err);
  person.favoriteFoods.push('hamburger');
  person.save(function(err, data) {
    if (err) return console.error(err);
    console.log('Person updated:', data);
  });
});

// Perform new updates on a document using Model.findOneAndUpdate()
const personName = 'Alice';
Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, function(err, data) {
  if (err) return console.error(err);
  console.log(`Person "${personName}" updated:`, data);
});

// Delete one person by _id using Model.findByIdAndRemove()
Person.findByIdAndRemove(personId, function(err, data) {
  if (err) return console.error(err);
  console.log(`Person "${personId}" removed:`, data);
});

// Delete all people with name "Mary" using Model.remove()
const name = 'Mary';
Person.remove({ name: name }, function(err, data) {
  if (err) return console.error(err);
  console.log(`People with name "Mary" ` , data )
});



Person.find({ favoriteFoods: 'burrito' }) // Find people who like burritos
  .sort({ name: 1 }) // Sort the results by name in ascending order
  .limit(2) // Limit the results to two documents
  .select('-age') // Hide the 'age' field in the results
  .exec(function(err, data) {
    if (err) return console.error(err);
    console.log('People who like burritos:', data);
  });


