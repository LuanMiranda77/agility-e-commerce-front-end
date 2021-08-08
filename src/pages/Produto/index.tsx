
import { HeaderAdmin } from "../../components/HeaderAdmin"
import produtoIcone from "../../assets/produtoIcone.svg"
import { Container } from "./styles"
import { ButtonBase } from "../../components/ButtonBase"
import { Divider } from "primereact/divider"
import { InputSearch } from "../../components/InputSearch"
import { Table } from "../../components/Table"
//import { InputSearch } from "../../components/InputSearch"

export function Produto(){
    return(
        <Container>
            <HeaderAdmin/>
            <div className="card p-mt-3 p-pt-4">
                <div className="p-grid">
                    <div className="p-grid  p-col-12 p-md-6 p-lg-7">
                        <img src={produtoIcone} alt="img" className="p-ml-2 p-p-2" />
                        <label className="p-ml-2 p-pt-2">Cadastro de Produto</label>
                    </div>
                    <div className="p-grid   p-col-12 p-md-6 p-lg-5">
                        <ButtonBase label="Adicionar" icon="pi pi-plus" className="p-mr-2 p-button-success"/>
                        <ButtonBase label="Remover" icon="pi pi-times" className=" p-button-danger"/>
                    </div>
                    <Divider />
                </div>
                <div className="p-grid p-flex">
                        <div className="p-mt-2 p-ml-2 p-col-12 p-md-6 p-lg-6" >
                        <ButtonBase label="Estoque mínimo" icon="" className=" p-button-warning"/>
                        </div>
                        <div className= "p-p-2 p-col-12 p-md-6 p-lg-5">
                        <InputSearch  className="p-ml-6" placeholder="Pesquise..."/>
                        </div>
                </div>
                <Table/>
                
            </div>
        </Container>
    )
}