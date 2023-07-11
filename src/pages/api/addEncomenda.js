import connect from "../../db/database";
import Encomenda from "../../models/encomendaSchema";

connect()

export default async function handler(req,res){
    let encomenda;
    let produto;
    let quantidade;
    let seller;
    let comprador;
    let transporte;
    let preco;

    try{
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Access-Control-Allow-Origin', '*')
        // another common pattern
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )
        // id produto
        comprador = req.query.comprador
        produto = req.query.prod
        quantidade = req.query.n
        seller = req.query.seller
        transporte

    }
}