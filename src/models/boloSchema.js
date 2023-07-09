import mongoose from "mongoose";

const boloSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.models.Bolo || mongoose.model('Bolo', boloSchema)