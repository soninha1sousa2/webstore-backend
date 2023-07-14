import connect from "../../db/database";
import Encomenda from "../../models/encomendaSchema";

//recebe id do fornecedor
//devolve encomendas cujos produtos incluem produtos vendidos pelo seller

connect()

export default async function handler(req, res) {
    try {

        const cliente = req.query.id; //id do cliente

        const encomendas = await Encomenda.find({comprador:cliente});

        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Access-Control-Allow-Origin', '*')
        // another common pattern
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )
        
        //filtrar lista recebida
        let result = []

        for (let i = 0; i < encomendas.length; i++) {
            //devolver o mesmo resultado, mas sem produtos.found e produtos.img
            let nova = JSON.parse(JSON.stringify(encomendas[i]));
            //console.log(nova);

            for (let j = 0; j < nova.produtos.length; j++) {
                
                delete nova.produtos[j].found;
                delete nova.produtos[j].img;
                console.log(nova.produtos[j]);
            }

            result.push(nova);
        }
       

        res.send({ status: 'ok', data: result });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ status: 'Not able to get.', error: error })
    }

}