const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const mongoose = require("mongoose");
const recipeModel = require("./models/Recipe.model");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res) => {
  recipeModel
    .create(req.body)
    .then((createdRecipe) => {
      console.log("Recipe created", createdRecipe);
      res.status(201).json(createdRecipe);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Problem creating recipe" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res) => {
  recipeModel
    .find({})
    .then((allRecipes) => {
      console.log("Retrieved recipes", allRecipes);
      res.status(200).json(allRecipes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed request" });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res) => {
  const { id } = req.params;
  recipeModel
    .findById(id)
    .then((oneRecipe) => {
      console.log("Retrieved recipes", oneRecipe);
      res.status(200).json(oneRecipe);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed request" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", (req, res) => {
  const { id } = req.params;
  recipeModel
    .findByIdAndUpdate(id, req.body, {
      new: true,
    })
    .then((updatedRecipe) => {
      console.log("Here are the recipes", updatedRecipe);
      res.status(200).json(updatedRecipe);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "There was error updating" });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPet = await recipeModel.findByIdAndDelete(id);
    console.log("Here is the deleted pet", deletedPet);
    res.status(200).json(deletedPet);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "There was an error deleting" });
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
