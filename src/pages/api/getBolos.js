import connect from "../../db/database";
import Bolo from "../../models/boloSchema";

connect()

export default async function handler(req, res) {
    try {
        const bolos = await Bolo.find({});
        res.send({ status: 'ok', data: bolos });
    }
    catch (error) {
        res.status(400).json({ status: 'Not able to get.' })
    }

}