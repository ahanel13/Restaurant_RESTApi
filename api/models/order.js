const mongoose = require('mongoose');

//Creating a item schema
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    menutItems:  [
        {type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true }
    ], 
    send_to_kitchen: { type: Boolean, defualt: false},
    time_completed: Date
},
    {timestamps: true}
);

module.exports = mongoose.model('Order', orderSchema);