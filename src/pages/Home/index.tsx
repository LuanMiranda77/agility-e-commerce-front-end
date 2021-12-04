import React, { useContext, useEffect,  useState  } from "react"

import { Container } from './styles';
import { observer} from 'mobx-react-lite';
import HomeStore  from "../../stores/HomeStore";
import {HeaderCliente} from '../../components/HeaderCliente'

/**
*@Author Luan Mirnada
*@Issue AE-25
*/

const Home: React.FC = () => {
  const store = useContext(HomeStore);

  return <Container>
          <HeaderCliente/>
    
         </Container>;
}
export default observer(Home);