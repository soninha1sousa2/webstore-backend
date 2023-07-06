//usada na página do cesto
//so precisa devolver o carrinho de um cliente
import connect from "../../db/database";
import Cesto from "../../models/cestoSchema";
import mongoose from 'mongoose';

connect()

export default async function handler(req, res) {
    try {
        const cestoId = new mongoose.Types.ObjectId(req.id); //id do cliente
        //console.log("deu");
        //console.log(cestoId);
        const cesto = await Cesto.find({ _id: cestoId });
        //const cesto1 = await Cesto.findById(cestoId);
        
        //console.log(cesto);
        //console.log(cesto1);

        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Access-Control-Allow-Origin', '*')
        // another common pattern
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )

        //envia objeto
        if (!cesto) {
            return res.status(404).json({ status: 'Not found' });
        }
        //console.log(cesto);
        res.send({
            status: 'ok',
            data: cesto
        });
    }
    catch (error) {
        //console.error(error);
        res.status(400).json({ status: 'Not able to get.', error: error })
    }
}