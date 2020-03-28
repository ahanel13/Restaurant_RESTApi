const mongoose = require('mongoose');

//Creating a item schema
const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //FIXME: add tables refernce
    first_name: String,
    last_name: String,
    password: { type: String, required: true },
    position: Number
});

module.exports = mongoose.model('Employee', employeeSchema);