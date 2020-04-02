const mongoose = require('mongoose');
const MenuItem = require('./menuItem');


//Creating a item schema
const orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    menuItems:  [MenuItem.schema], 
    send_to_kitchen: { type: Boolean, defualt: false},
    time_completed: Date
},
    {timestamps: true}
);

module.exports = mongoose.model('Order', orderSchema);