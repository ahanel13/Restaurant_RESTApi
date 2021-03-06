const mongoose = require('mongoose');
const MenuItem = require('./menuItem');


//Creating a item schema
const orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    menuItems:  [MenuItem.schema], 
    send_to_kitchen: { type: Boolean, default: false},
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true},
    table_number: Number,
    time_completed: Date
},
    {timestamps: true}
);

module.exports = mongoose.model('Order', orderSchema);