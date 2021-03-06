import firebase from '../../firebaseConnection';
import 'firebase/auth';
import React from 'react';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { styled, createTheme, ThemeProvider } from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import MuiAppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { blueGrey } from '@material-ui/core/colors';
import DomainIcon from '@material-ui/icons/Domain';
import MoreIcon from '@material-ui/icons/More';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Stack } from '@material-ui/core';


const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: blueGrey[500],
    },
    botao:{
      
    }
  },
});

theme.typography.h1 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};
theme.typography.h6 = {
  fontSize: '1.1rem',
  '@media (min-width:600px)': {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.4rem',
  },
};
theme.typography.h2 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.6rem',
  },
};
theme.typography.p = {
  fontSize: '0.8rem',
  '@media (min-width:600px)': {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
};

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

const card1 = (
  <React.Fragment>
    <ThemeProvider theme={theme}>
    <CardContent>
      <Typography variant="h6" component="div">
        Loja
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Todos os produtos
      </Typography>
      <Typography variant="p">
        Visualizar os produtos, adiciona-os ao carrinho e fecha sua compra
      </Typography>
    </CardContent>
    <CardActions>
      <Button href="/produto" size="small" variant="contained" 
      disableElevation sx={{bgcolor:'secondary.main', color: 'primary.main'}} >Abrir</Button>
    </CardActions>
    </ThemeProvider>
  </React.Fragment>
);

const card2 = (
  <React.Fragment>
    <ThemeProvider theme={theme}>
    <CardContent>
      <Typography variant="h6" component="div">
        Meu cadastro
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Cliente/Usu??rio
      </Typography>
      <Typography variant="p">
        Dados cadastrais dos clientes/usu??rios do sistema
      </Typography>
    </CardContent>
    <CardActions>
      <Button href="/meucadastro" size="small" variant="contained" 
      disableElevation sx={{bgcolor:'secondary.main', color: 'primary.main'}} >Abrir</Button>
    </CardActions>
    </ThemeProvider>
  </React.Fragment>
);
const card3 = (
  <React.Fragment>
    <ThemeProvider theme={theme}>
    <CardContent>
      <Typography variant="h6" component="div">
        Meus Produtos
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Quero vender
      </Typography>
      <Typography variant="p">
        Visualizar os produtos oferecidos para venda.
      </Typography>
    </CardContent>
    <CardActions>
      <Button href="/admprodutousuario" size="small" variant="contained" 
      disableElevation sx={{bgcolor:'secondary.main', color: 'primary.main'}} >Abrir</Button>
    </CardActions>
    </ThemeProvider>
  </React.Fragment>
);
const card4 = (
  <React.Fragment>
    <ThemeProvider theme={theme}>
    <CardContent>
      <Typography variant="h6" component="div">
        Minhas transa????es
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Transa????es realizadas
      </Typography>
      <Typography variant="p">
        Visualizar as compras e vendas efetuadas
      </Typography>
    </CardContent>
    <CardActions>
      <Button href="/minhatransacao" size="small" variant="contained" 
      disableElevation sx={{bgcolor:'secondary.main', color: 'primary.main'}} >Abrir</Button>
    </CardActions>
    </ThemeProvider>
  </React.Fragment>
);
const card5 = (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <CardContent>
        <Typography variant="h6" component="div">
          Carrinho de Compras
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Seu carrinho de compras
        </Typography>
        <Typography variant="p">
          Visualizar os produtos, adiciona-os ao carrinho e fecha sua compra
        </Typography>
      </CardContent>
      <CardActions>
        <Button href="/carrinhocompra" size="small" variant="contained" 
        disableElevation sx={{bgcolor:'secondary.main', color: 'primary.main'}} >Abrir</Button>
      </CardActions>
      </ThemeProvider>
    </React.Fragment>
  );
  


export default function Gerenciamentousuario() {

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function checkLogin() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      } else {
        firebase.auth().signOut();
        localStorage.clear();
        window.location.href = '/login';
      }
    })
  }

  checkLogin();

  function fazerLogout() {
    firebase.auth().signOut();
    localStorage.clear();
    window.location.href = '/login';
  }
  function abrirHome() {
    window.location.href = '/';
  }
  function abrirPostocoleta() {
    window.location.href = '/postocoleta';
  }


  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <AppBar position="fixed" color="secondary" open={open} elevation={0}>
          <Toolbar>
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5, ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box id="dashlogo"
              noWrap
                sx={{
                  mr: 2, display: { xs: 'none', md: 'flex' },
                  backgroundRepeat: 'no-repeat',
                  width: 50,
                  height: 50,
                }} />
            <IconButton
              size="large"
              aria-label="account of current user"
              onClick={handleMenu}
              color="primary"
              
            >
              <AccountCircle />
            </IconButton>
            {<Typography variant='p' disable>{'Ol??, ' + localStorage.getItem('nomelogado') + '.'}</Typography>}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => abrirHome()}>Home</MenuItem>
              <MenuItem onClick={() => fazerLogout()}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton color="secondary" onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Meu Cadastro', 'Meus Produtos', 'Minhas Transa????es'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 3 === 0 ?
                    <DomainIcon color="secondary" onClick={() => abrirPostocoleta()} /> :
                    <MoreIcon color="secondary" href="/admnoticia" />}

                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Logout'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  <ExitToAppIcon color="secondary" onClick={() => fazerLogout()} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{justifyContent: 'center'}}>
            <Box sx={{ minWidth: 250 }}>
              <Card variant="outlined"
              sx={{
              maxWidth: '100%',
              bgcolor: '#fafafa'
              }}>{card1}</Card>
            </Box>
            <Box sx={{ minWidth: 250 }}>
              <Card variant="outlined"
              sx={{
              maxWidth: '100%',
              bgcolor: '#fafafa'
              }}>{card2}</Card>
            </Box>
            <Box sx={{ minWidth: 250 }}>
              <Card variant="outlined"
              sx={{
              maxWidth: '100%',
              bgcolor: '#fafafa'
              }}>{card3}</Card>
            </Box>
            <Box sx={{ minWidth: 250 }}>
              <Card variant="outlined"
              sx={{
              maxWidth: '100%',
              bgcolor: '#fafafa'
              }}>{card4}</Card>
            </Box>
            <Box sx={{ minWidth: 250 }}>
              <Card variant="outlined"
              sx={{
              maxWidth: '100%',
              bgcolor: '#fafafa'
              }}>{card5}</Card>
            </Box>
          </Stack>

          <br />
          <Typography paragraph>
            Clicando Em Avalia????es do site, acessamos um gr??fico de satisfa????o de nosso  projeto 
            e tamb??m uma lista de mensagens idenficadas que nos s??o enviadas nos permite  sentir
            mais de perto as sugest??oes e criticas dos usu??rios mais interessados no tema.
          </Typography>

        </Box>
      </Box>
    </ThemeProvider>

  );
}