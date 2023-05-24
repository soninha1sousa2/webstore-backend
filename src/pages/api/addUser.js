import connect from "../../db/database";
import User from "../../models/userSchema";

connect()

export default async function handler(req, res) {
    try {
        console.log(req.body)
        const user = await User.create(req.body);
        if (!user) {
            return res.json({ "code": 'User not created' })
        }
        return res.json({ "code": "Success!" })
    } catch (error) {
        res.status(400).json({ status: 'Not able to create a new user.' })
    }
}