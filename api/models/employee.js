const mongoose = require('mongoose');

//Creating a item schema
const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tables: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem'}
    ],
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        required: true
    },
    pay: {type: Number, required: true},
    password: { type: String, required: true },
    position: { type: Number, required: true },
    current_shift: {type: mongoose.Schema.Types.ObjectId, ref: 'Shift', default: null}
});

module.exports = mongoose.model('Employee', employeeSchema);