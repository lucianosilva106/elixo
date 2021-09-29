import './header.css';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function Header(){
    return(
        
<header>
 <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography>
            <Button color="inherit" href="/">O Projeto</Button>
            <Button color="inherit" href="/reciclavel">Os Recicláveis</Button>
            <Button color="inherit" href="/dano">Os danos</Button>
            <Button color="inherit" href="/acao">As ações</Button>
            <Button color="inherit" href="/nossoapp">Nosso Aplicativo</Button>
            <Button color="inherit" href="/contato">Fale Conosco</Button>          
            <Button color="inherit" href="/login">Login</Button>
           </Typography>         
        </Toolbar>
      </AppBar>
    </Box>
    </header>
    )
}