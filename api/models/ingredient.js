const mongoose = require('mongoose');

//Creating a item schema
const ingredientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String, 
    quantity: Number
});

module.exports = mongoose.model('Ingredient', ingredientSchema);