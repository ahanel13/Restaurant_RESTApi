const mongoose = require('mongoose');

//Creating a item schema
const tableSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_ids: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}, 
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order'}
});

module.exports = mongoose.model('Table', shiftSchema);