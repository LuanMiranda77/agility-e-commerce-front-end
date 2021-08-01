import { InputText } from "primereact/inputtext";
import { InputHTMLAttributes } from "react";
import { Container } from "./styles";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label: string;
  icon: string;
  placeholder: string;
}

export const InputGroup: React.FC<InputProps> = (props) => {
  let id = props.label.replaceAll(" ","").toLowerCase();

  return (
    <Container>
      <label htmlFor={props.label}>{props.label}</label>
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
            <i className={props.icon}></i>
        </span>
        <InputText id={id} name={id} {...props}></InputText>
      </div>
    </Container>
  )
}
