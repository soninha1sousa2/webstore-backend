import connect from "../../db/database";

connect()

export default async function handler(req, res) {
    const email = req.email;
    try {
        const bolo = await Bolo.find({ email: email });
        res.send({ status: 'ok', data: bolo });
    }
    catch (error) {
        res.status(400).json({ status: 'Not able to get.' })
    }

}