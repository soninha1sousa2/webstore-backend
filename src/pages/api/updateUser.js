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

        const obj = JSON.parse(req.body.replace("/",""))

        const email = obj.email
        const nome = obj.nome
        const dataNascimento = obj.dataNascimento
        const morada = obj.morada
        const telemovel = obj.telemovel

        const update = await User.findOneAndUpdate({email: email},{
            nome: nome,
            dataNascimento: dataNascimento,
            morada: morada,
            telemovel: telemovel
        })
        res.send({ status: 'ok', data: email })
        
    } catch (error) {
        res.status(400).json({ status: 'Not able to create.' })
    }
}
