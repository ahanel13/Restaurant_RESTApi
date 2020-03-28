const mongoose = require('mongoose');

//Creating a item schema
const shiftSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }, // FIXME: 
    menuItem_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true }
});

module.exports = mongoose.model('Shift', shiftSchema);