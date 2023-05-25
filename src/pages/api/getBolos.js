import connect from "../../db/database";
import Bolo from "../../models/boloSchema";

connect()

export default async function handler(req, res) {
    try {
        const bolos = await Bolo.find({});
        res.send({
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
            status: 'ok',
            data: bolos,
        });
    }
    catch (error) {
        res.status(400).json({ status: 'Not able to get.' })
    }

}