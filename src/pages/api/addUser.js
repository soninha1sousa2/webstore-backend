import connect from "../../db/database";
import User from "../../models/userSchema";
import cors from "cors"

connect()

const corsOptions = {
    origin: '*',
    methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    allowHeaders: '*',
    credentials: true
}

export default async function handler(req, res) {
    try {
        console.log(req.body)

        await cors(corsOptions)(req, res);

        const user = await User.create(req.body);
        if (!user) {
            res.send({ "code": 'User not created' })
        }
        res.send({ "code": "Success!" })
    } catch (error) {
        res.status(400).json({ status: 'Not able to create a new user.' })
    }
}