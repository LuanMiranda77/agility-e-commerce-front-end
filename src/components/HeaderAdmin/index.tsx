import { Logo } from "../logo";
import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ListItem from '@material-ui/core/ListItem';
import { Drawer } from "@material-ui/core";
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { AccountBox, AccountTree, Category, Public, ShoppingCart, Store } from "@material-ui/icons";
import MoveToInbox from "@material-ui/icons/MoveToInbox";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useHistory } from 'react-router-dom';
import { Utils } from '../../utils/utils';
import icon from "../../assets/icon-voltar.png";
import {
  Keyboard, ThreeDRotation, FilterVintage,
  FeaturedPlayList, BrightnessHigh, Dashboard,
  CompareArrows, HowToReg,
} from '@material-ui/icons';

declare module 'csstype' {
  interface Properties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}
type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

export function HeaderAdmin(props: any) {
  let userLogado = Utils.getTokenLogin();
  const isCliente = (userLogado?.role === "CLIENTE" ? true : false);
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      list: {
        width: 350,
      },
      fullList: {
        width: 'auto',
      },
      grow: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
    }),
  );

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const history = useHistory();

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const useTreeItemStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        color: theme.palette.text.secondary,
        '&:hover > $content': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:focus > $content, &$selected > $content': {
          backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
          color: 'var(--tree-view-color)',
        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
          backgroundColor: 'transparent',
        },
      },
      content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(0),
        borderBottomRightRadius: theme.spacing(0),
        paddingRight: theme.spacing(8),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
          fontWeight: theme.typography.fontWeightRegular,
        },
      },
      group: {
        marginLeft: 0,
        '& $content': {
          paddingLeft: theme.spacing(5),
        },
      },
      expanded: {},
      selected: {},
      label: {
        fontWeight: 'bold',
        color: 'inherit',
      },
      labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2, 0),

      },
      labelIcon: {
        marginRight: theme.spacing(2),
      },
      labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
        fontSize: 18,
      },
    }),
  );


  function StyledTreeItem(props: StyledTreeItemProps) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
      <TreeItem
        label={
          <div className={classes.labelRoot}>
            <LabelIcon color="primary" className={classes.labelIcon} />
            <Typography variant="body2" className={classes.labelText}>
              {labelText}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </div>
        }
        style={{
          '--tree-view-color': color,
          '--tree-view-bg-color': bgColor,
        }}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          group: classes.group,
          label: classes.label,
        }}
        {...other}
      />
    );
  }
  const [state, setStatus] = useState(false);
  // Lógica de links do menu
  const toggleDrawer = (open: boolean, page: string) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setStatus(open);
    if (page === 'dashboard') {
      history.push(`/${page}`);
    } else if (page === 'produto') {
      history.push(`/${page}`);
    } else if (page === 'categoria') {
      history.push(`/${page}`);
    } else if (page === 'pedido') {
      history.push(`/${page}`)
    } else if (page === 'endereco') {
      history.push(`/${page}`)
    } else if (page === 'trocasenha') {
      history.push(`/${page}`)
    } else if (page === 'cliente') {
      history.push(`/${page}`)
    } else if (page === 'lojaconfig') {
      history.push(`/${page}`)
    } else if (page === 'livreconfig') {
      history.push(`/${page}`)
    } else if (page === 'pagoconfig') {
      history.push(`/${page}`)
    } else if (page === 'loja') {
      history.push(`/${page}`)
    } else if (page === 'marketplace') {
      history.push(`/${page}`)
    }else if (page === 'pedido-marketplace') {
      history.push(`/${page}`)
    }
    

  };

  const userLogout = () => {
    Utils.logout();
    history.push('/login');
  }

  const list = () => (
    <div
      role="presentation"
      //onClick={toggleDrawer(false,'')}
      onKeyDown={toggleDrawer(false, '')}
    >
      <List>
        <ListItem button key={"/Login"} onClick={toggleDrawer(false, '')}>
          <Logo className="p-ml-4" />
        </ListItem>
      </List>
      <Divider />
      <TreeView
        // className={classes.root}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        {!isCliente ?
          <StyledTreeItem nodeId="1" labelText="DASHBORD"
            labelIcon={Dashboard}
            onClick={toggleDrawer(false, 'dashboard')} /> : ''}
        <Divider />
        <StyledTreeItem nodeId="2" labelText={!isCliente ? "MINHA LOJA" : "MINHA CONTA"} labelIcon={!isCliente ? Store : AccountBox}>
          <StyledTreeItem
            nodeId="3"
            labelText={!isCliente ? "Informações da Loja" : 'Informações da Pessoais'}
            labelIcon={!isCliente ? Store : HowToReg}
            labelInfo=""
            color="#1a73e8"
            bgColor="#e8f0fe"
            onClick={toggleDrawer(false, !isCliente ? 'loja' : 'cliente')}
          />
          {!isCliente ? "" :
            <StyledTreeItem
              nodeId="5"
              labelText="Endereço"
              labelIcon={Public}
              labelInfo=""
              color="#a250f5"
              bgColor="#f3e8fd"
              onClick={toggleDrawer(false, 'endereco')}
            />}
          <StyledTreeItem
            nodeId="4"
            labelText="Trocar senha"
            labelIcon={CompareArrows}
            labelInfo=""
            color="#e3742f"
            bgColor="#fcefe3"
            onClick={toggleDrawer(false, 'trocasenha')}
          />

        </StyledTreeItem>
        <Divider />
        {!isCliente ?
          (<StyledTreeItem nodeId="6" labelText="CÁTALAGO" labelIcon={MoveToInbox}>
            <StyledTreeItem
              nodeId="61"
              labelText="Produto"
              labelIcon={ShoppingCart}
              // labelInfo="90"
              color="#1a73e8"
              bgColor="#e8f0fe"
              onClick={toggleDrawer(false, 'produto')}
            />
            <StyledTreeItem
              nodeId="62"
              labelText="Categoria"
              labelIcon={FeaturedPlayList}
              // labelInfo="10"
              color="#e3742f"
              bgColor="#fcefe3"
              onClick={toggleDrawer(false, 'categoria')}
            />
            <StyledTreeItem
              nodeId="63"
              labelText="Marketplaces"
              labelIcon={Category}
              labelInfo=""
              color="#e3742f"
              bgColor="#fcefe3"
              onClick={toggleDrawer(false, 'marketplace')}
            />
          </StyledTreeItem>) :
          ''}
        <Divider />
        {!isCliente ?
          <StyledTreeItem nodeId="12" labelText={"PEDIDOS"} labelIcon={PostAddIcon}>
            <StyledTreeItem
              nodeId="121"
              labelText={"Pedidos Loja"}
              labelIcon={PostAddIcon}
              // labelInfo="733"
              color="#3c8039"
              bgColor="#e6f4ea"
              onClick={toggleDrawer(false, 'pedido')}
            />
            <StyledTreeItem
              nodeId="122"
              labelText={"Pedidos Marketplace"}
              labelIcon={Category}
              // labelInfo="733"
              color="#3c8039"
              bgColor="#e6f4ea"
              onClick={toggleDrawer(false, 'pedido-marketplace')}
            />
          </StyledTreeItem>
          :
          <StyledTreeItem
            nodeId="123"
            labelText={"COMPRAS"}
            labelIcon={PostAddIcon}
            labelInfo="733"
            color="#3c8039"
            bgColor="#e6f4ea"
            onClick={toggleDrawer(false, 'pedido')}
          />
        }
        <Divider />
        {/* {!isCliente ?
          <StyledTreeItem nodeId="10" labelText="PROMOÇÕES" labelIcon={MonetizationOnIcon} />
          : ''}
        <Divider /> */}
        {!isCliente ?
          <StyledTreeItem nodeId="10" labelText="CONFIGURAÇÃO" labelIcon={BrightnessHigh} >
            <StyledTreeItem
              nodeId="101"
              labelText="Site da loja"
              labelIcon={Store}
              labelInfo=""
              color="#1a73e8"
              bgColor="#e8f0fe"
              onClick={toggleDrawer(false, 'lojaconfig')}
            />
            <StyledTreeItem
              nodeId="102"
              labelText="Mercado Livre"
              labelIcon={Category}
              labelInfo=""
              color="#a250f5"
              bgColor="#f3e8fd"
              onClick={toggleDrawer(false, 'livreconfig')}
            />
            <StyledTreeItem
              nodeId="103"
              labelText="Mercado Pago"
              labelIcon={MonetizationOnIcon}
              labelInfo=""
              color="#e3742f"
              bgColor="#fcefe3"
              onClick={toggleDrawer(false, 'pagoconfig')}
            />
          </StyledTreeItem>
          : ''}
      </TreeView>
    </div>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Minha conta</MenuItem> */}
      <MenuItem onClick={userLogout}>Sair</MenuItem>
    </Menu>
  );

  const buttonVoltar = (
    <div className="">
      <div className="p-col-12 p-text-ringht">
        <button type="button" onClick={() => history.push('/home')} className="p-grid "
          style={{ background: 'white', border: '0', cursor: 'pointer' }}    >
          <img src={icon} alt="img" />
          <label htmlFor="" className="p-mt-2 p-text-bold" style={{ color: 'var(--text-title)', fontSize: '18px', cursor: 'pointer' }}>VOLTAR</label>
        </button>
      </div>
    </div>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" >
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" >
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"

        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (

    <div className={classes.grow} >
      <AppBar position="fixed" style={{ background: 'var(--white)', zIndex: 999 }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
            onClick={toggleDrawer(true, '')}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Logo className='p-mt-2' />
          </Typography>
          <div className={classes.grow} />
          {!isCliente ?
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" >
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 17 new notifications"  >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}

              >
                <AccountCircle />
              </IconButton>
            </div> : buttonVoltar}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}

            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div>
        <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false, '')}>
          {list()}
        </Drawer>
      </div>
    </div>
  )
}