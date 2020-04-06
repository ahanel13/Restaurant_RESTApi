const mongoose = require('mongoose');

//Creating a item schema
const tableSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_ids: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    table_number: {type: String, required: true, unique: true},
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true}, 
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order'}
});

module.exports = mongoose.model('Table', tableSchema);