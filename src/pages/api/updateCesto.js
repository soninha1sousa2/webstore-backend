//cria um cesto ou adiciona produto a um cesto já existente
//usada na página de produto e na do cesto

//id do user
//id do produto
import connect from "../../db/database";
import User from "../../models/cestoSchema";

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

        //obter corpo da mensagem
        const obj = JSON.parse(req.body.replace("/",""));
        console.log(obj);

        //objetos no pedido
        const id = obj.id
        const produto = obj.prod
        const quantidade = obj.n

        let existingCesto = await Cesto.find({ _id: id });
        //se não encontrado, criar um
        if (!existingCesto) {
            existingCesto = new Cesto({ _id: id, produtos: [] });
        }
        //!nao verifica se o cliente recebido existe

        // Find the index of the existing product in the 'produtos' array
        const existingProductIndex = existingCesto.produtos.findIndex(
            (item) => item.produto.toString() === produto
        );

        if (quantidade === 0) { //se for para remover o produto do cesto
            // Remove the product if it is still in the cart
            if (existingProductIndex !== -1) { //se o produto estiver no cesto
                existingCesto.produtos.splice(existingProductIndex, 1);
            }
        } else {
            // Update the quantidade of the product or add the product if not present
            if (existingProductIndex !== -1) {
                existingCesto.produtos[existingProductIndex].quantidade = quantidade;
            } else {
                existingCesto.produtos.push({ produto, quantidade });
            }
        }

        const update = await existingCesto.findOneAndUpdate({ _id: id }, existingCesto);
        res.send({ status: 'ok', data: update })
            
    } catch (error) {
        //console.log(error);
        res.status(400).json({ status: 'Not able to create.', error: error.toString() })
    }
}
