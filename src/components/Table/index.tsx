import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { IProduto } from "../../services/ProdutoServices/produtoInterface";
import { Container } from "./styles";


export function Table(){


        const[produtos,setProdutos] = useState<IProduto[]>([])

        useEffect(() => {
            api.get('produto')
                .then(response => setProdutos(response.data))
        }, []);
    
 

    return(
        <Container>
            <div className="card">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>FOTO</th>
                        <th>NOME</th>
                        <th>CÓDIGO</th>
                        <th>PREÇO ATACADO</th>
                        <th>PREÇO VAREJO</th>
                        <th>QUANTIDADE</th>
                    </tr>
                </thead>

                <tbody>
                   {produtos.map( produtos => (
                        <tr key={produtos.id}>
                        <td></td>
                        <td><img src= {produtos.imagens[0]} alt="" /></td>
                        <td className = "title">{produtos.descricao}</td>
                        <td>{produtos.codigoBarras}</td>
                        <td>{produtos.precoAtacado}</td>
                        <td>{produtos.precoVarejo}</td>
                        <td>{produtos.quantidade}</td>
                        </tr>
                   )
                        
                   )}

                    

                </tbody>


            </table>
            </div>
        </Container>
    )
}