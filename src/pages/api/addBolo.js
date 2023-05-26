import connect from "../../db/database";
import Bolo from "../../models/boloSchema";

connect()

export default async function handler(req, res) {
    try {
        const bolo = await Bolo.create(req.body);
        if (!bolo) {
            return res.json({ "code": 'User not created' })
        }
        return res.json({ "code": "Success!" })
    } catch (error) {
        res.status(400).json({ status: 'Not able to create.' })
    }
}
