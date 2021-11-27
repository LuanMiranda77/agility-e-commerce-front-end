import { InputText } from "primereact/inputtext";
import { InputHTMLAttributes } from "react";
import { Container } from "./styles";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label: string;
  placeholder: string;
}

export const InputBase: React.FC<InputProps> = (props) => {
  let id = props.label.replaceAll(" ","").toLowerCase();
  return (
    <Container className="p-field">
        <div>
          <label htmlFor={props.label}>{props.label}</label>
        </div>
        <InputText id={id} name={id} {...props}></InputText>
    </Container>
  )
}
