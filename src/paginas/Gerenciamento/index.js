import firebase from '../../firebaseConnection';
import 'firebase/auth';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import './gerencia.css';

export default function Gerenciamento() {

    async function checkLogin(){
        await firebase.auth().onAuthStateChanged((user) => {
          if(user){
            }else{
              firebase.auth().signOut();
              localStorage.clear();
              window.location.href = '/login';
          }
        })
    }
    
    checkLogin();

    function fazerLogout(){
        firebase.auth().signOut();
        localStorage.clear();
        window.location.href = '/';
    }

    return (
      <div>
        <h2 text-align="center"> Area restrita aos Administradores para gerenciamento de notícias e postos de coleta</h2>
        <br/>
        <div>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="default">
                  <Toolbar>
                    <Typography>
                    <Button color="success" href="/admpostocoleta">Postos de Coleta</Button>
                    <Button color="success" href="/admnoticia">Notícias</Button>
                    <Button color="success" href="/admproposta">Solicitações para Posto de Coleta</Button>
                    </Typography>         
                </Toolbar>
                </AppBar>
            </Box>
        </div>
        <br/><br/><br/>
        <button type="button" class="block" onClick={ fazerLogout }>Logout</button>
      </div>
    );
  }
  