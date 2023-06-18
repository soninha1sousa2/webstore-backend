import connect from "../../db/database";
import User from "../../models/userSchema";

connect()

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

        const email = req.body.email
        const nome = req.body.nome
        const dataNascimento = req.body.dataNascimento
        const morada = req.body.morada
        const telemovel = req.body.telemovel

        await User.findOneAndUpdate({email: email},{
            nome: nome,
            dataNascimento: dataNascimento,
            morada: morada,
            telemovel: telemovel
        })
        .then((doc) => res.send("nao erro"))
        .catch((err) => res.send("erro"))
        
    } catch (error) {
        res.status(400).json({ status: 'Not able to create.' })
    }
}
