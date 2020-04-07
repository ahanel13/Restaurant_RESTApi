const mongoose = require('mongoose');

//Creating a item schema
const ingredientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type:String, required: true }, 
    quantity: { type: Number, default: 0}
});

module.exports = mongoose.model('Ingredient', ingredientSchema);