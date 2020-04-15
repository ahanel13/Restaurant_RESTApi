const mongoose = require('mongoose');

//Creating a item schema
const compSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }, 
    menuItem_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    reason: {type: String, required: true}
},
    {timestamps: true}    
);
 
module.exports = mongoose.model('Comp', compSchema);