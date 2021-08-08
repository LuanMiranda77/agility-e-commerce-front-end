import { useEffect, useState } from "react";
import { api } from "../../services/apiDev";
import { Container } from "./styles";

    interface Produto{
        id: number;
        codigoBarras: string;
        nome: string;
        precoVarejo: number;
        precoAtacado: number;
        quantidade: number;
        descricao: string;
        imagens: string[];

    }

export function Table(){


        const[produtos,setProdutos] = useState<Produto[]>([])

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