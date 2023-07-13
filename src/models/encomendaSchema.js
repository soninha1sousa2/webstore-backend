import mongoose from "mongoose";

const encomendaSchema = new mongoose.Schema({
    produtos: [{
        _id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        quantidade: {
            type: Number,
            required: true
        },
        found: {
            type: Boolean,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        img: {
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
    },
    estado:{
        type: String,
        required: true
    },
    NIF: {
        type: String,
        required: true,
    },
    morada: {
        type: String,
        required: true,
    },
    telemovel: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.models.Encomenda || mongoose.model('Encomenda',encomendaSchema)