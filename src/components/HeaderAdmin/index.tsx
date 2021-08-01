import { Header } from "./styles";
import { Card } from 'primereact/card';
import { Logo } from "../logo";
import { Dropdown } from 'primereact/dropdown';
import { PanelMenu } from 'primereact/panelmenu';

const citySelectItems = [
    {label: 'New York', value: 'NY'},
    {label: 'Rome', value: 'RM'},
    {label: 'London', value: 'LDN'},
    {label: 'Istanbul', value: 'IST'},
    {label: 'Paris', value: 'PRS'}
];


export function HeaderAdmin() {
 //const menu = useRef([]);
  const items = [
    { label: 'Categories' },
    { label: 'Sports' },
    { label: 'Football' },
    { label: 'Countries' },
    { label: 'Spain' },
    { label: 'F.C. Barcelona' },
    { label: 'Squad' },
    { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi' }
  ];

  
  return (
    <Header>
      <Card className="card">
      {/* <PanelMenu model={items} style={{width:'300px'}}/> */}
        <Logo className="logo" />

      </Card>
      {/* <BreadCrumb model={items} home={home}/> */}
    </Header>
  )
}