const mongoose = require('mongoose');

//Creating a item schema
const menuItemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ingredients: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true }
    ],
    name: { type: String, required: true},
    picture: String,
    description: { type: String, required: true},
    price: { type: Number, required: true},
    nutrition: { type: String, required: true},
    item_type: { type: String, required: true},
    category: { type: String, required: true},
    paid: { type: Boolean, defualt: false},    
    special_instruct: { type:String, defualt: "No intructions provided."}
});

module.exports = mongoose.model('MenuItem', menuItemSchema);