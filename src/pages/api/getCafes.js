import connect from "../../db/database";
import Cafe from "../../models/cafeSchema";

connect()

export default async function handler(req, res) {
    try {
        const cafes = await Cafe.find({});
        res.send({ status: 'ok', data: cafes });
    }
    catch (error) {
        res.status(400).json({ status: 'Not able to get.' })
    }

}