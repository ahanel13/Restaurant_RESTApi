const mongoose = require('mongoose');

//Creating a item schema
const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tables: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true }
    ],
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    position: { type: Number, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);