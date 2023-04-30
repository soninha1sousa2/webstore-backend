import connect from "../../db/database";
import Cafe from "../../models/cafeSchema";

connect()

export default async function handler(req, res) {
    try {
        console.log(req.body)
        const cafe = await Cafe.create(req.body);
        if (!cafe) {
            return res.json({ "code": 'User not created' })
        }
        return res.json({ "code": "Success!" })
    } catch (error) {
        res.status(400).json({ status: 'Not able to create a new user.' })
    }
}