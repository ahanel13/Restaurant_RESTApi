const mongoose = require('mongoose');
const MenuItem = require('./menuItem');


//Creating a item schema
const reviewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true},
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true},
    question01_rating: {type: Number, default: null},
    question01_reason: String,
    question02_rating: {type: Number, default: null},
    question02_reason: String,
    question03_rating: {type: Number, default: null},
    question03_reason: String,
},
    {timestamps: true}
);

module.exports = mongoose.model('Review', reviewSchema);