const mongoose = require('mongoose');

//Creating a item schema
const shiftSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }, 
    clock_in: { type : Date, default: Date.now() },
    clock_out: Date
});

module.exports = mongoose.model('Shift', shiftSchema);