const mongoose = require('mongoose');

//Creating a item schema
const notifcationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }, // FIXME: 
    sender: {type: String, require: true },   //kitchen or table number
    notificationType: { type:String, required: true}
});

module.exports = mongoose.model('Notification', notifcationSchema);