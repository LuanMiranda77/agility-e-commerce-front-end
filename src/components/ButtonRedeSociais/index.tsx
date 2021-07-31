import { Button } from "primereact/button";
import { ButtonHTMLAttributes } from "react";
import { Container } from "./styles";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: string;
  sizeIcon: string;
  size: string;
}



export const ButtonRedeSociais: React.FC<ButtonProps> = (props) => {
  return (
    <Container>
      <Button className={props.className}>
        <i className={props.icon + " p-px-" + props.sizeIcon}></i>
        <span className={"p-px-"+props.size}>{props.label}</span>
      </Button>
    </Container>
  )
}
