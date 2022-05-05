import firebase from '../../firebaseConnection';
import React from 'react';
import 'firebase/storage';
import { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Container } from '@material-ui/core';
import { Grid, Avatar, Paper } from '@material-ui/core';
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
import PanToolIcon from '@material-ui/icons/PanTool';
import AssistantIcon from '@material-ui/icons/Assistant';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, blueGrey, grey, green } from '@material-ui/core/colors';
import '../Produto/produto.css'

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
    banner: {
      main: green[500],
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
theme.typography.tag = {
  fontSize: '0.65rem',
  '@media (min-width:600px)': {
    fontSize: '0.65rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '0.65rem',
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
  const [listachats, setListachats] = useState([]);

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
            if (item.data().aprovado == true) {
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

  function irCarrinho() {
    alert('vai para o carrinho')
    window.location.href = '/carrinho';
  }

  function salvarProdutocarrinho(idproduto, descricao, preco, pathimg) {

    var new_data = { idprod: idproduto, descprod: descricao, valor: preco, imgpath: pathimg };

    if (localStorage.getItem('produtocarrinho') == null) {
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

  function addChat() {

  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: '#fafafa',
          pt: 8,
          pb: 15,
        }}
      >
        <Container maxWidth="xl">
          <Grid id="grid-bg1" container component="main" align="left"
            sx={{ alignItems: 'center', height: '450px', justifyContent: 'center' }}>
            <Stack direction={{ sm: 'row' }}
              spacing={{ xs: 1, sm: 2, md: 2 }} alignItems="center" justifyContent="space-evenly">
              <Box>
                <Card id="card-main" sx={{ maxWidth: 750, borderRadius: 3 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="350"
                      elevation={0}
                      sx={{ border: 0 }}/>
                    <CardContent elevation={0} className='card-content'>
                      <Typography gutterBottom color="white" variant="h4">
                        Encontre seu usado
                      </Typography>
                      <Typography variant="body2" color="white">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>

              <Box direction={{ sm: 'row' }} sx={{ mt: 1, mb: 2, }}>
                <Box>
                  <Card id="card-off" sx={{ maxWidth: 350, borderRadius: 3, mt: 1, mb: 2, }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="100"
                        sx={{
                          backgroundSize: 'cover',
                        }}
                      />
                      <CardContent className='card-content'>
                        <Typography gutterBottom color="white" variant="h5" component="div">
                          30% OFF
                        </Typography>
                        <Typography variant="body2" color="white">
                          em Celulares
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>

                <Box>
                  <Card id="card-donation" sx={{ maxWidth: 350, borderRadius: 3 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="100"
                        sx={{
                          backgroundSize: 'cover',
                        }}
                      />
                      <CardContent className='card-content'>
                        <Typography gutterBottom color="white" variant="h5" component="div">
                          Descartes e doações
                        </Typography>
                        <Typography variant="body2" color="white">
                          Tem algum item que gostaria de descartar? Nós te ajudamos!
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>
              </Box>

            </Stack>
          </Grid>
        </Container>

        <Grid container component="main"
          sx={{
            justifyContent: 'space-around',
            bgcolor: '#fafafa',
            alignContent: 'center',
          }}>
          <Stack direction={{
            xs: 'column', sm: 'row', marginTop: '4%',
          }}
            spacing={{ xs: 1, sm: 2, md: 6 }} >

            <Box sx={{
              textAlign: 'center',
              color: 'white',
              alignItems: 'center'
            }}>
              <IconButton id="btnicon" sx={{ color: 'primary.main', fontSize: 40, }} variant="rounded">
                <AssistantIcon fontSize="inherit" />
              </IconButton>
              <Button fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'primary.main' }}
              >Praticidade</Button>
            </Box>

            <Box sx={{
              textAlign: 'center',
              color: 'white',
            }}>
              <IconButton id="btnicon" sx={{ color: 'primary.main', fontSize: 40, }} variant="rounded">
                <PanToolIcon fontSize="inherit" />
              </IconButton>
              <Button fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'primary.main' }}
              >Acessibilidade</Button>
            </Box>

            <Box sx={{
              textAlign: 'center',
              color: 'white',
            }}>
              <IconButton id="btnicon" sx={{ color: 'primary.main', fontSize: 40, }} variant="rounded">
                <AttachMoneyIcon fontSize="inherit" />
              </IconButton>
              <Button type="submit" fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'primary.main' }}
              >Preço</Button>
            </Box>
            <Box sx={{
              textAlign: 'center',
              color: 'white',
              alignItems: 'center'
            }}>
              <IconButton id="btnicon" sx={{ color: 'primary.main', fontSize: 40, }} variant="rounded">
                <AssignmentIndIcon fontSize="inherit" />
              </IconButton>
              <Button fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'primary.main' }}
              >Vendedores Locais</Button>
            </Box>

            <Box sx={{
              textAlign: 'center',
              color: 'white',
            }}>
              <IconButton id="btnicon" sx={{ color: 'primary.main', fontSize: 40, }} variant="rounded">
                <LocalShippingIcon fontSize="inherit" />
              </IconButton>
              <Button fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'primary.main' }}
              >Entrega Rápida</Button>
            </Box>

            <Box sx={{
              textAlign: 'center',
              color: 'white',
            }}>
              <IconButton id="btnicon" sx={{ color: 'primary.main', fontSize: 40, }} variant="rounded">
                <AllInboxIcon fontSize="inherit" />
              </IconButton>
              <Button type="submit" fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'primary.main' }}
              >Produtos Especializados</Button>
            </Box>

          </Stack>
        </Grid>

      </Box>


      <Grid container component="main"
        sx={{
          justifyContent: 'space-around',
          alignContent: 'center',
          textAlign: 'center'
        }}>
        <Stack direction={{
          xs: 'column', sm: 'row', marginTop: '2%', alignContent: 'center', textAlign: 'center',
        }}
          spacing={{ xs: 1, sm: 2, md: 6 }} >

          <Box sx={{
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center'
          }}>
            <Box
              alt="imagem"
              id="computadores-categorias"
              sx={{ width: 120, height: 120, borderRadius: 50 }}
            />
            <Typography sx={{ marginTop: '5%', textAlign: 'center' }} gutterBottom variant='h6'>Computadores</Typography>
          </Box>

          <Box sx={{
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center'
          }}>
            <Box
              id="celulares-categorias"
              sx={{ width: 120, height: 120, borderRadius: 50 }}
            />
            <Typography sx={{ marginTop: '5%', textAlign: 'center' }} gutterBottom variant='h6'>Celulares</Typography>
          </Box>

          <Box sx={{
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center'
          }}>
            <Box
              id="tvs-categorias"
              sx={{ width: 120, height: 120, borderRadius: 50 }}
            />
            <Typography sx={{ marginTop: '5%', textAlign: 'center' }} gutterBottom variant='h6'>TV's</Typography>
          </Box>

          <Box sx={{
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center'
          }}>
            <Box
              id="videogames-categorias"
              sx={{ width: 120, height: 120, borderRadius: 50 }}
            />
            <Typography sx={{ marginTop: '5%', textAlign: 'center' }} gutterBottom variant='h6'>Video-Games</Typography>
          </Box>

          <Box sx={{
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center'
          }}>
            <Box
              id="casa-categorias"
              sx={{ width: 120, height: 120, borderRadius: 50 }}
            />
            <Typography sx={{ marginTop: '5%', textAlign: 'center' }} gutterBottom variant='h6'>Eletrodomésticos</Typography>
          </Box>

        </Stack>
      </Grid>

      <Box
        sx={{
          pt: 8,
          pb: 15,
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Paper elevation={0}
            sx={{
              minHeight: '450px',
              bgcolor: 'primary.main',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}>
              <Typography variant='h2' gutterBottom
              sx={{color:'white', marginTop: '3%', }}>Últimas Ofertas</Typography>

            <Container fixed
              sx={{ marginTop: '1%', }}>

              <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ md: 1 }}
                alignItems="center"
                justifyContent="center"
                sx={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifySelf: 'center',
                }}>

                {listaprodutos.map((listaproduto) => {
                  posicao = posicao + 1;
                  return (
                    <Grid xs zeroMinWidth sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '10%',
                    }}
                    
                      key={listaproduto.id}>

                      <Card sx={{ maxWidth: 250, minWidth: 50, backgroundColor: '#fafafa', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
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
                        <Button fullWidth variant="outlined" disableElevation
                          size='small' onClick={() => handleOnOpen(listaproduto.id)}>Adicionar ao Carrinho</Button>
                      </Card>
                      <Typography gutterBottom variant='p'>{listaproduto.isOpen}</Typography>
                      {listaproduto.isOpen && (
                        <div>
                          <Dialog
                            open={open}
                            onClose={() => handleOnClose(listaproduto.id)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <Avatar variant="rounded" src={listaproduto.pathimagem} 
                            sx={{ width: 150, height: 150, marginTop: 3, alignItems: 'center', alignContent: 'center', alignSelf: 'center',
                            justifyContent: 'center', textAlign: 'center', color: 'primary.main', border: 3, borderRadius: 1, }} />
                            <DialogTitle variant="h5" sx={{ color: 'primary.main' }} id="alert-dialog-title">
                              {listaproduto.descricao}
                            </DialogTitle>
                            
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            <Box sx={{ bgcolor: 'primary.main', width: '20%', alignContent: 'center', color:'white',
                              alignItems: 'center', alignContent: 'center', justifyContent: 'center', textAlign: 'center',
                               borderRadius: 1, textJustify: 'center',}}>
                            <Typography variant="tag" gutterBottom>USADO</Typography>
                            </Box>
                            </DialogContentText>
                              <DialogContentText id="alert-dialog-description">
                                <Typography variant="h6" gutterBottom>Informações</Typography>
                                <Typography variant="p" gutterBottom>{listaproduto.info}</Typography>
                              </DialogContentText>
                              <DialogContentText sx={{marginTop: 2}} id="alert-dialog-description">
                                <Box sx={{ bgcolor: '#fafafa', width: '20%', minHeight: 30, alignContent: 'center',
                              alignItems: 'center', alignContent: 'center', justifyContent: 'center', textAlign: 'center',
                              color: 'primary.main', border: 2, borderRadius: 1, textJustify: 'center',}}>
                              <Typography variant="p" gutterBottom>R$ {listaproduto.preco}</Typography>
                              </Box>
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button variant="contained" autoFocus disableElevation size="small"
                                //                          onClick={() => adicionarCarrinho(listaproduto.id, listaproduto.descricao, listaproduto.preco, posicao)} autoFocus>
                                onClick={() => salvarProdutocarrinho(listaproduto.id, listaproduto.descricao, listaproduto.preco, listaproduto.pathimagem)}>
                                Adicionar ao carrinho
                              </Button>
                              <Button variant="outlined" disableElevation size="small"
                                onClick={() => abreChat(listaproduto.id)} >
                                Falar com vendedor
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

          </Paper>
        </Container>
      </Box>


    </ThemeProvider>
  )

}

export default Produtos;