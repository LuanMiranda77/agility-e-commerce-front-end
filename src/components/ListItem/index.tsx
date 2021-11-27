import React from 'react';
import { Container } from './styles';

interface ListItemProps {
  //adicionar os props
  array: Array<any>;
}

export const ListItem: React.FC<ListItemProps> = (props) => {
    const listItems = props.array.map((item,  id) =>
    <li key={id}>{item}</li>
    );
  return <Container>
    <ul>{listItems}</ul>
  </Container>;
}