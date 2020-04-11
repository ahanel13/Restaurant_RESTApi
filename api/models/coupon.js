const mongoose = require('mongoose');

//Creating a item schema
const couponSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    couponType: {type: String, required: true },
    requiredItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', default: null }],
    appliedItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true }],
    discount: { type:Number, required: true },
    active: { type: Boolean, default: false },
    repeatable: { type: Boolean, required: true },
    description: {type: String, required: true}
});

module.exports = mongoose.model('Coupon', couponSchema);