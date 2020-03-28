const mongoose = require('mongoose');

//Creating a item schema
const menuItemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ingredients: [{ //array of ingredient ids
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Ingredient', 
        required: true }],
    name: String,
    picture: URL,
    desctription: String,
    price: Number,
    nutrition: String,
    item_stype: String,
    category: String,
    paid: Boolean,
    special_instruct: String
});

module.exports = mongoose.model('MenuItem', menuItemSchema);