import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputHTMLAttributes } from "react";
import { Container } from "./styles";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  //buttonFuncion: Function;
}

export const InputSearch: React.FC<InputProps> = (props) => {
  //onClick={props.buttonFuncion()}
  return (
    <Container>
      <div className="p-inputgroup">
        <InputText {...props}></InputText>
        <Button id="pesquisar" name="pesquisar" icon="pi pi-search" className="p-button-warning" />
      </div>
    </Container>
  )
}
