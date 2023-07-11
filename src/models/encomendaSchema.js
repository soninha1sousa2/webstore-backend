import mongoose from "mongoose";

const encomendaSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    produtos: [{
        _id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        quantidade: {
            type: Number,
            required: true
        },
        seller: {
            type: String,
            required: true
        }        
    }],
    comprador: {
        type: String,
        required: true
    },
    transporte: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.models.Encomenda || mongoose.model('Encomenda',encomendaSchema)