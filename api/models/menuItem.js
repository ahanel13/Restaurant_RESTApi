const mongoose = require('mongoose');

//Creating a item schema
const menuItemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ingredients: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true }
    ],
    name: String,
    picture: String,
    desctription: String,
    price: Number,
    nutrition: String,
    item_type: String,
    category: String,
    paid: Boolean,
    special_instruct: String
});

module.exports = mongoose.model('MenuItem', menuItemSchema);