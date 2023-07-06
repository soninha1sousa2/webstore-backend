//esquema de dados na tabela cart
import mongoose from "mongoose";

const cestoSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    produtos: [{
        produto: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        quantidade: {
            type: Number,
            required: true
        }
    }]
    });

module.exports = mongoose.models.Cesto || mongoose.model('Cesto', cestoSchema)