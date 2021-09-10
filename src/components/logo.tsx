import logo from '../assets/logo-pp.svg';
import { ImgHTMLAttributes} from "react";


interface LogoProps extends ImgHTMLAttributes<HTMLImageElement> {
  className: string;
}

export const Logo: React.FC<LogoProps> = (props) => {
  return (
        <img src={logo} alt="logo" className={props.className}/>
  )
}