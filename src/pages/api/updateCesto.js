//cria um cesto ou adiciona produto a um cesto já existente
//usada na página de produto e na do cesto

//id do user
//id do produto
import connect from "../../db/database";
import Cesto from "../../models/cestoSchema";

connect()

export default async function handler(req, res) {
    let existingCesto;
    let id;
    let produto;
    let quantidade;
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
        //const obj = JSON.parse(req.body.replace("/",""));
        //console.log(obj);

        //objetos no pedido
        id = req.body.id
        produto = req.body.prod
        quantidade = req.body.n
        console.log("id: ", id);
        console.log("produto: ", produto);
        console.log("quantidade: ", quantidade);

        existingCesto = await Cesto.find({ _id: id });
        //se não encontrado, criar um
        console.log("Cesto encontrado: ", existingCesto);
        if (Array.isArray(existingCesto)) { //se o cliente não tem cesto na bd
            existingCesto = new Cesto({ _id: id, produtos: [] });
            console.log("Novo cesto criado: ", existingCesto);
        }
        //!nao verifica se o cliente recebido existe

        // Find the index of the existing product in the 'produtos' array
        //erro: existingCesto.produtos não existe para uma lista produtos vazia
        if (existingCesto && existingCesto.produtos && existingCesto.produtos.length > 0) {
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
                if (existingProductIndex !== -1) { //se o produto estiver no cesto
                    existingCesto.produtos[existingProductIndex].quantidade = quantidade;
                } else {
                    existingCesto.produtos.push({ produto: produto, quantidade: quantidade });
                    console.log("Inserido em produtos: ",{ produto: produto, quantidade: quantidade });
                }
            }
        } else { // quando o cesto não tem produtos
            if (quantidade !== 0) {  //se não for para remover produto
              console.log("Cesto antes: ", existingCesto);
              existingCesto.produtos.push({ produto: produto, quantidade: quantidade });
              console.log("Inserido em produtos: ",{ produto: produto, quantidade: quantidade });
              console.log("Cesto depois: ", existingCesto);
            }
        }
        console.log("Novo cesto: ", existingCesto);
        const update = await Cesto.findOneAndUpdate({ _id: id }, existingCesto);
        res.send({ status: 'ok', 
                   request: { id: id, 
                              produto: produto, 
                              quantidade: quantidade 
                            }, 
                   data: existingCesto });
            
    } catch (error) {
        //console.log(error);
        res.status(400).json({ status: 'Not able to create.', 
                               request: { id: id, 
                                          produto: produto, 
                                          quantidade: quantidade 
                                        }, 
                               cesto: existingCesto ,
                               error: error.toString() 
                            })
    }
}
