import { Logo } from "../logo";
import React,{useState} from 'react';
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
import { Drawer, Icon } from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { AccountBox, AccountTree, Category, Public, ShoppingCart, Store } from "@material-ui/icons";
import MoveToInbox from "@material-ui/icons/MoveToInbox";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PostAddIcon from '@material-ui/icons/PostAdd';
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

export function HeaderAdmin() {
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
      fontSize:18,
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
  const toggleDrawer = (open: boolean) => (
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
  };
  const list = () => (
    <div
      role="presentation"
      //onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          <ListItem button key={"/Login"} onClick={toggleDrawer(false)}>
           <Logo className="p-ml-4"/>
          </ListItem>
      </List>
      <Divider />
      <TreeView
     // className={classes.root}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      >
      <StyledTreeItem nodeId="1" labelText="DASHBORD" labelIcon={AccountTree} />
      <Divider />
      <StyledTreeItem nodeId="2" labelText="MINHA LOJA" labelIcon={Store}>
        <StyledTreeItem
            nodeId="3"
            labelText="Dados Pessoais"
            labelIcon={AccountBox}
            labelInfo=""
            color="#1a73e8"
            bgColor="#e8f0fe"
            onClick={toggleDrawer(false)}
          />
          <StyledTreeItem
            nodeId="4"
            labelText="Dados Bancários"
            labelIcon={AccountBalanceIcon}
            labelInfo=""
            color="#e3742f"
            bgColor="#fcefe3"
            onClick={toggleDrawer(false)}
          />
          <StyledTreeItem
            nodeId="5"
            labelText="Endereço"
            labelIcon={Public}
            labelInfo=""
            color="#a250f5"
            bgColor="#f3e8fd"
            onClick={toggleDrawer(false)}
          />
          <StyledTreeItem
            nodeId="6"
            labelText="Pedidos"
            labelIcon={PostAddIcon}
            labelInfo="733"
            color="#3c8039"
            bgColor="#e6f4ea"
            onClick={toggleDrawer(false)}
          />
      </StyledTreeItem>
      <Divider />
      <StyledTreeItem nodeId="7" labelText="CÁTALAGO" labelIcon={MoveToInbox}>
        <StyledTreeItem
          nodeId="8"
          labelText="Produto"
          labelIcon={ShoppingCart}
          labelInfo="90"
          color="#1a73e8"
          bgColor="#e8f0fe"
          onClick={toggleDrawer(false)}
        />
        <StyledTreeItem
          nodeId="9"
          labelText="Categoria"
          labelIcon={Category}
          labelInfo="10"
          color="#e3742f"
          bgColor="#fcefe3"
          onClick={toggleDrawer(false)}
        />
      </StyledTreeItem>
      <Divider />
      <StyledTreeItem nodeId="10" labelText="PROMOÇÕES" labelIcon={MonetizationOnIcon} />
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
      <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Minha conta</MenuItem>
      <MenuItem onClick={handleMenuClose}>Sair</MenuItem>
    </Menu>
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
      <AppBar position="fixed" style={{background: 'var(--white)'}}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
           <Logo className='p-mt-2'/>
          </Typography>
          <div className={classes.grow} />
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
          </div>
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
          <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
      </div>
    </div>
  )
}