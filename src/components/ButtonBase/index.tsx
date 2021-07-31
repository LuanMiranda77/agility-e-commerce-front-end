import { Button } from "primereact/button";
import { ButtonHTMLAttributes } from "react";
import { Container } from "./styles";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: string;
  className: string;
}

export const ButtonBase: React.FC<ButtonProps> = (props) => {
    return (
      <Container>
        <Button {...props}> </Button>
      </Container>
    )
}
