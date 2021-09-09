import React,{useState} from 'react';
import { Container } from './styles';
import { createStyles,  withStyles, Theme } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 14,
      width: '13rem',
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
      
    },
  }),
)(InputBase);

interface Props {
    dados: Array<any>;
} 
const ComboBase: React.FC<Props> = (props) => {
  const [age, setAge] = useState('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  return( <Container>
        <NativeSelect
          id="demo-customized-select-native"
          value={age}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {props.dados.map((name) => (
            <option key={name.id} value={name.value}>
              {name.label}
            </option>
          ))}
        </NativeSelect>
   </Container>
  );
}

export default ComboBase;