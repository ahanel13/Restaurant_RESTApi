const mongoose = require('mongoose');

//Creating a item schema
const tipSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    tip_amount: { type: Number, require: true}
},
    {timestamps: true}    
);
 
module.exports = mongoose.model('Tip', tipSchema);