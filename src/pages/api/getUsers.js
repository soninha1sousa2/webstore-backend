import connect from "../../db/database";
import User from "../../models/userSchema";

connect()

export default async function handler(req, res) {
    try {
        const user = await User.find({});
        res.send({ status: 'ok', data: user });
    }
    catch (error) {
        res.status(400).json({ status: 'Not able to get.' })
    }

}