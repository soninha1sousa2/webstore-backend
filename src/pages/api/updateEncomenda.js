import { ObjectId } from "mongodb";
import connect from "../../db/database";
import Encomenda from "../../models/encomendaSchema";

connect()

export default async function handler(req, res) {
    try {

        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Access-Control-Allow-Origin', '*')
        // another common pattern
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )

        const obj = JSON.parse(req.body.replace("/",""))

        const id = obj.id

        const update = await Encomenda.findByIdAndUpdate(id ,{
            estado: "pago",
        })
        res.send({ status: 'ok', data: id })
        
    } catch (error) {
        res.status(400).json({ status: 'Not able to create.' })
    }
}
