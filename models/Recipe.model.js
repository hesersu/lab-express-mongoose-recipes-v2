// Your code here ...

// ./models/Recipe.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const recipeSchema = new Schema({
  title: { type: String, unique: true, required: true },
  instructions: { type: String, required: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: { type: [String] },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: { type: Number, min: 0 },
  isArchived: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },

  //   title: String,
  //   year: Number,
  //   codeISBN: { type: String, maxlength: 13, unique: true },
  //   quantity: { type: Number, min: 0, default: 0 },
  //   lastPublished: { type: Date, default: Date.now },
  //   genre: { type: String, enum: ["romance", "fiction", "biography", "poetry"] },
  //   author: String,
});

// CREATE MODEL
// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Book" --> "books"
const Recipe = mongoose.model("Recipe", recipeSchema);

// EXPORT THE MODEL
module.exports = Recipe;
