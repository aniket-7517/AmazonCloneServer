const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    specifications: [String],
    imgSrc: {
        type: String,
        required: true
    },
    images: [String],
    catagory: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Product', ProductSchema);