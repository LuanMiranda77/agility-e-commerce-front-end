import { InputText } from "primereact/inputtext";
import { InputHTMLAttributes } from "react";
import { Container } from "./styles";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label: string;
  placeholder: string;
  required?: boolean;
}

export const InputBase: React.FC<InputProps> = (props) => {
  let id = props.label.replaceAll(" ", "").toLowerCase();
  return (
    <Container>
      <div className="p-field"> 
        <label htmlFor={props.label}>{props.label}{props.required ? <span className="p-ml-1" style={{ color: 'red' }}>*</span> :''}</label>
        <InputText id={id} name={id} {...props} style={{ width: '100%' }}></InputText>
      </div>
    </Container>
  )
}
