import React, { useContext, useEffect,  useState  } from "react"

import { Container } from './styles';
import { observer} from 'mobx-react-lite';
import LojaConfigStore  from "../../stores/LojaConfigStore"

/**
*@Author
*@Issue
*/

const LojaConfig: React.FC = () => {
  const store = useContext(LojaConfigStore);

  return <Container>
    
         </Container>;
}
export default observer(LojaConfig);