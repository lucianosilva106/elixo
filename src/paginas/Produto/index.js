import firebase from '../../firebaseConnection';
import React from 'react';
import 'firebase/storage';
import { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Stack from '@material-ui/core/Stack';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/core/Alert';
import Divider from '@material-ui/core/Divider';
import { Box } from '@material-ui/system';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, blueGrey, grey } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: orange[500],
    },
    textos: {
      main: grey[800],
    },
  },
});

theme.typography.h1 = {
  fontSize: '1.7rem',
  '@media (min-width:600px)': {
    fontSize: '1.9rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
};
theme.typography.h5 = {
  fontSize: '1.1rem',
  '@media (min-width:600px)': {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.4rem',
  },
};
theme.typography.h6 = {
  fontSize: '1.1rem',
  '@media (min-width:600px)': {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.2rem',
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



function Produtos() {

    const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    const [open, setOpen, aberto] = React.useState(false);
  
    const handleClick = () => {
      setOpen(true);
    };

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const [listaprodutos, setListaprodutos] = useState([]);
  const [openchat, setOpenchat] = useState(false);
  const[listachats, setListachats] = useState([]);

  const [open, setOpen] = useState(false);
  const [addcar, setAddcar] = useState(false);

  function handleToogle(id) {
    const prods = listaprodutos.map(item => {
      if (item.id === id) item.isOpen = !item.isOpen
      return item
    })
    setListaprodutos(prods)
  }

  function handleOnOpen(id) {
    setOpen(true);
    return handleToogle(id)
  }

  function handleOnClose(id) {
    setOpen(false);
    setOpenchat(false);
    return handleToogle(id)

  }

  const handleClose = () => {
    setAddcar(false);
  }

  const handleClick = () => {
    setAddcar(true);
  }

  var contmsg = 0;

  useEffect(() => {
    async function loadProdutos() {
      await firebase.firestore().collection('produtos')
        .onSnapshot((doc) => {
          let meusProdutos = [];
          doc.forEach((item) => {
            if (item.data().aprovado == true){
              meusProdutos.push({
                id: item.id,
                descricao: item.data().descricao,
                preco: item.data().preco,
                info: item.data().info,
                pathimagem: item.data().pathimagem
              })
            }
          })
          setListaprodutos(meusProdutos);
        })
    }
    loadProdutos();

    async function loadChats() {
      await firebase.firestore().collection('chats')
        .onSnapshot((doc) => {
          let meusChats = [];
          doc.forEach((item) => {
  //          if (item.data().idproduto == true){
              meusChats.push({
                mensagem: item.data().mensagem
              })
  //          }
          })
          setListachats(meusChats);
//          alert(listachats.length)
        })
    }
    loadChats();
  

  }, [])

  let idvenda = localStorage.getItem("minhavenda");

  var posicao = 0;
  var dataAtual = '';
  var data = new Date();
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  dataAtual = dia + '/' + mes + '/' + ano;

  function irCarrinho(){
    alert('vai para o carrinho')
    window.location.href = '/carrinho';
  }

  function salvarProdutocarrinho(idproduto, descricao, preco, pathimg){

    var new_data = {idprod: idproduto, descprod: descricao, valor: preco, imgpath: pathimg};

    if (localStorage.getItem('produtocarrinho') == null){
      localStorage.setItem('produtocarrinho', '[]');
    }

    var old_data = JSON.parse(localStorage.getItem('produtocarrinho'));

    old_data.push(new_data);

    localStorage.setItem("produtocarrinho", JSON.stringify(old_data));

    alert("Array salvo com sucesso");

  }
  
  const abreChat = () => {

    setOpenchat(true);

  }

  function addChat(){

  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: '#fafafa',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
            sx={{color:'primary.main'}}
          >
            Re-user / Produtos ofertados{idvenda}
            <button onclick={() => window.location.href = '/carrinho'}>Ir para Carrinho</button>
          </Typography>
        </Container>
      </Box>

    <Container fixed
    sx={{marginTop: '2%'}}>
      
      <Stack direction={{ xs: 'column', sm: 'row' }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={{ sm: 2, md: 2 }}
        alignItems="center"
        justifyContent="center"
        sx={{
          alignItems: 'center',
          alignSelf: 'center',
          justifySelf: 'center'
        }}>

        {listaprodutos.map((listaproduto) => {
            posicao = posicao + 1;
            return (
              <Grid sx={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                justifySelf: 'center'
              }}
                key={listaproduto.id}>

                <Card sx={{ maxWidth: 250, minWidth: 50, backgroundColor: '#fafafa', justifyContent: 'center', alignItems: 'center' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={listaproduto.pathimagem}
                      alt="produto"
                    />
                    <CardContent sx={{
                      justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                      justifySelf: 'center'
                    }}>
                      <Typography gutterBottom component="div"> {listaproduto.descricao} </Typography>
                    </CardContent>
                  </CardActionArea>

                  <IconButton sx={{
                    top: '50%',
                    left: '42%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifySelf: 'center'
                  }}
                    aria-label="circle"
                    onClick={() => handleOnOpen(listaproduto.id)}><AddCircleIcon 
                    sx={{ alignSelf: 'center', justifyContent: 'center', color: 'primary.main' }} />
                  </IconButton>
                </Card>
                <p>{listaproduto.isOpen}</p>
                {listaproduto.isOpen && (
                  <div>
                    <Dialog
                      open={open}
                      onClose={() => handleOnClose(listaproduto.id)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle variant="h5" sx={{color:'primary.main'}} id="alert-dialog-title">
                        {listaproduto.descricao}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">                        
                          <Typography variant="h6" gutterBottom>Informações:</Typography>
                          <Typography variant="h6" gutterBottom> Preço de Venda: R$ {listaproduto.preco} </Typography>
                          <Typography variant="h6" gutterBottom>Preparo: {listaproduto.info} </Typography>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button variant="outlined" disableElevation size="small"
//                          onClick={() => adicionarCarrinho(listaproduto.id, listaproduto.descricao, listaproduto.preco, posicao)} autoFocus>
                          onClick={() => salvarProdutocarrinho(listaproduto.id, listaproduto.descricao, listaproduto.preco, listaproduto.pathimagem)} autoFocus>                            
                          Adicionar ao carrinho
                        </Button>
                        <Button variant="outlined" disableElevation size="small"
                          onClick={() => abreChat(listaproduto.id)} autoFocus>                            
                          Chat
                        </Button>

                      </DialogActions>
                    </Dialog>

                    <Snackbar open={addcar} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Produto adicionado ao carrinho!
                      </Alert>
                    </Snackbar>
                    
                  </div>
                )}
                {listaproduto.isOpen && (
                  <div>
                    <Dialog
                      open={openchat}
                      onClose={handleOnClose}
//                      scroll={scroll}
                      aria-labelledby="scroll-dialog-title"
                      aria-describedby="scroll-dialog-description"
                    >
                    <DialogTitle id="scroll-dialog-title">Chat do Produto {listaproduto.descricao}</DialogTitle>
                    {listaprodutos
                    .map((listaprodutos) => 
                      `teste.`
                      , )
                      .join('\n')}
                    </Dialog>
                  </div>
                )}

              </Grid>
            )
        })}
      </Stack>

    </Container>
    </ThemeProvider>
  )

}

export default Produtos;