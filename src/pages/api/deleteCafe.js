import connect from "../../db/database";
import Cafe from "../../models/cafeSchema";

connect();

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
        const obj = JSON.parse(req.body.replace("/", ""))
        await Cafe.deleteOne({ _id: obj._id })
        res.send({ "code": "Success!" })

    } catch (error) {
        res.status(400).json({ status: "not able to delete" })
    }
}

