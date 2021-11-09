import firebase from '../../firebaseConnection';
import 'firebase/auth';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import { TextField } from "@material-ui/core";
import { orange, green } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { InputLabel } from "@material-ui/core";
import Stack from '@material-ui/core/Stack'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Admnoticia() {

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

    const[idNoticia, setIdNoticia] = useState('');
    const[titulo, setTitulo] = useState('');
    const[descricao, setDescricao] = useState('');
    const[data, setData] = useState('');
    const[autor, setAutor] = useState('');
    const[tag, setTag] = useState('');
    const[link, setLink] = useState('');
    const[noticias, setNoticias] = useState([]);
    
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
  
    const [abrir, setAbrir] = React.useState(false);
    const abrirAlert = () => {
      setAbrir(true);
    };
  
    
    const [open, setOpen, aberto] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    useEffect(() => {
      async function loadNoticias(){
        await firebase.firestore().collection('noticias')
        .onSnapshot((doc) => {
          let minhasNoticias = [];
          doc.forEach((item) => {
            minhasNoticias.push({
              id: item.id,
              titulo: item.data().titulo,
              descricao: item.data().descricao,
              data: item.data().data,
              autor: item.data().autor,
              tag: item.data().tag,
              link: item.data().link
            })
          })

          setNoticias(minhasNoticias);
        })
      }

      loadNoticias();

    }, [])
    
    async function handleAdd(){
      await firebase.firestore().collection('noticias')
      .add({
        titulo: titulo,
        descricao: descricao,
        data: data,
        autor: autor,
        tag: tag,
        link: link
      })
      .then(()=>{
        handleClickOpen();
        setTitulo('');
        setDescricao('');
        setData('');
        setAutor('');
        setTag('');
        setLink('');
        buscaNoticias();
      })
      .catch((error)=>{ 
        alert('deu erro')
        console.log('ERRO: ' + error);
      })
    }

    async function buscaNoticias(){
      await firebase.firestore().collection('noticias')
      .get()
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            descricao: doc.data().descricao,
            data: doc.data().data,
            autor: doc.data().autor,
            tag: doc.data().tag,
            link: doc.data().link
          })
        })
        setNoticias(lista);

      })
      .catch(() => {

      })
    }

    async function editarNoticia(){
      await firebase.firestore().collection('noticias')
      .doc(idNoticia)
      .update({
        titulo: titulo,
        descricao: descricao,
        data: data,
        autor: autor,
        tag: tag,
        link: link
      })
      .then(() => {
        alert('DADOS ATUALIZADOS COM SUCESSO!')
        setIdNoticia('');
        setTitulo('');
        setDescricao('');
        setData('');
        setAutor('');
        setTag('');
        setLink('');
        buscaNoticias();
      })
      .catch((error) => {
        alert("Erro ao gravar alteração: " + error)
      })
    }

    function pegaNoticia(id){
      firebase.firestore().collection('noticias').doc(id)
      .onSnapshot((doc) => {
        setIdNoticia(id);
        setTitulo(doc.data().titulo);
        setDescricao(doc.data().descricao);
        setData(doc.data().data);
        setAutor(doc.data().autor);
        setTag(doc.data().tag);
        setLink(doc.data().link);
      }) 
    }

    async function excluirNoticia(id){
      await firebase.firestore().collection('noticias').doc(id)
      .delete()
      .then(() => {
        buscaNoticias();
      })
    }

    return (
      <ThemeProvider theme={theme}>
        <br />
  
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid id="imgcontato"
            xs={false}
            sm={4}
            item
            md={7}
            sx={{
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
        
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
            <Box
              sx={{
                my: 8,
                mx: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box component="form" noValidate sx={{ mt: 1 }}>
              
              <h2>Cadastro de Notícias</h2>

                <TextField
                  fullWidth
                  margin="normal"
                  required
                  size="small"
                  id="empresa-form"
                  label="Titulo"
                  defaultValue="Titulo"
                  value={titulo} onChange={(e) => setTitulo(e.target.value)} />
  
                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-required"
                  label="Descricao"
                  type="text"
                  defaultValue="Descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
  
                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-required"
                  label="Data"
                  type="text"
                  defaultValue="Data" value={data} onChange={(e) => setData(e.target.value)} />
  
                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-required"
                  label="Autor"
                  type="text"
                  defaultValue="Autor" value={autor} onChange={(e) => setAutor(e.target.value)} />
  
                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-required"
                  label="Tag"
                  type="text"
                  defaultValue="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
  
                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-textarea"
                  label="Link"
                  placeholder="Link"
                  multiline value={link} onChange={(e) => setLink(e.target.value)} />

                <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}
                  onClick={handleAdd}>Incluir Cadastro</Button><br />
  
                <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}
                  onClick={editarNoticia}>Atualizar Cadastro</Button><br />

              </Box>
            </Box>
          </Grid>
        </Grid>

        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Notícia cadastrada com sucesso!
          </Alert>
        </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={aberto} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Erro na gravação de Noticia!
          </Alert>
        </Snackbar>
        </Stack>
        <br />
        <ThemeProvider theme={theme}>
          <Container fixed id="topo"
            sx={{height: 100, marginTop: 6}}>
            <Typography variant="h3" gutterBottom component="div" align="center">
              Noticias cadastradas
            </Typography>
          </Container>
          <Container fixed>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead sx={{ color: 'primary' }}>
                  <TableRow>
                    <TableCell align="center">Titulo</TableCell>
                    <TableCell align="center">Descricao</TableCell>
                    <TableCell align="center">Data</TableCell>
                    <TableCell align="center">Autor</TableCell>
                    <TableCell align="center">Tag</TableCell>
                    <TableCell align="center">Link</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noticias.map((noticia) => {
                    return (
                      <TableRow
                        key={noticia.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">{noticia.titulo}</TableCell>
                        <TableCell align="center">{noticia.descricao}</TableCell>
                        <TableCell align="center">{noticia.data}</TableCell>
                        <TableCell align="center">{noticia.autor}</TableCell>
                        <TableCell align="center">{noticia.tag}</TableCell>
                        <TableCell align="center">{noticia.link}</TableCell>

                        <Button
                          variant="outlined" startIcon={<DeleteIcon />}
                          onClick={() => pegaNoticia(noticia.id)}
                          sx={{ margin: 1 }}
                          color="secondary">Alterar</Button>

                        <Button
                          variant="outlined" startIcon={<DeleteIcon />}
                          onClick={() => excluirNoticia(noticia.id)}
                          sx={{ margin: 1 }}
                          color="secondary">Remover</Button>
                      </TableRow>
                    )
                  })}
               </TableBody>
              </Table>
            </TableContainer>

          </Container>
        </ThemeProvider>
      </ThemeProvider>
    );
}
  
export default Admnoticia;