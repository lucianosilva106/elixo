import firebase from '../../firebaseConnection';
import 'firebase/auth';
//import firebase from 'firebase';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { InputAdornment, TextField, IconButton } from "@material-ui/core";
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
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import MonetizationOnSharpIcon from '@material-ui/icons/MonetizationOnSharp';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import BallotIcon from '@material-ui/icons/Ballot';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import { Typography } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import './admprodusuario.css'
import { orange, green, grey } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
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


function Admprodutousuario() {

  const [valores, setValores] = React.useState({
    amount: ''
  });

  const mudando = (prop) => (event) => {
    setValores({ ...valores, [prop]: event.target.value });
  };

  var storage = firebase.storage();
  const [image, setImage] = useState('');
  const [endImg] = useState('../img/drink1.jpg');
  const [imageAsUrl, setImageAsUrl] = useState('');

  const [idusuario, setIdUsuario] = useState('');
  var userlog = "";

  async function checkLogin() {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        userlog = user.uid;
      } else {
        firebase.auth().signOut();
        localStorage.clear();
        window.location.href = '/login';
      }
    })
  }

  checkLogin();

  const [idProduto, setIdProduto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [pathimagem, setPathimagem] = useState('');
  const [info, setInfo] = useState('');
  const [percentual, setPercentual] = useState('');

  const [produtos, setProdutos] = useState([]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen, aberto] = React.useState(false);
  const [excluir, setExcluir] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleExcluir = () => {
    setExcluir(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    async function loadProdutos() {
      await firebase.firestore().collection('produtos')
        .onSnapshot((doc) => {
          let meusProdutos = [];
          doc.forEach((item) => {
            if (item.data().idusuario == userlog) {
              meusProdutos.push({
                id: item.id,
                descricao: item.data().descricao,
                preco: item.data().preco,
                pathimagem: item.data().pathimagem,
                info: item.data().info,
                percentual: item.data().percentual
              })
            }
          })

          setProdutos(meusProdutos);
        })
    }

    loadProdutos();

  }, [])

  async function handleAdd() {
    await firebase.firestore().collection('produtos')
      .add({
        descricao: descricao,
        info: info,
        preco: preco,
        pathimagem: imageAsUrl,
        percentual: percentual,
        idusuario: userlog
      })
      .then(() => {
        handleClick();
        setDescricao('');
        setInfo('');
        setPreco('');
        setPathimagem('');
        setImageAsUrl('');
        setPercentual('');
        buscaProdutos();
      })
      .catch((error) => {
        alert(error);
        console.log('ERRO: ' + error);
      })
  }

  async function buscaProdutos() {
    await firebase.firestore().collection('produtos')
      .get()
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            descricao: doc.data().descricao,
            preco: doc.data().preco,
            pathimagem: doc.data().pathimagem,
            info: doc.data().info,
            percentual: doc.data().percentual
          })
        })
        setProdutos(lista);

      })
      .catch(() => {

      })
  }

  async function editarProduto() {
    await firebase.firestore().collection('produtos')
      .doc(idProduto)
      .update({
        descricao: descricao,
        info: info,
        preco: preco,
        pathimagem: imageAsUrl,
        percentual: percentual
      })
      .then(() => {
        alert('DADOS ATUALIZADOS COM SUCESSO!')
        setIdProduto('');
        setDescricao('');
        setInfo('');
        setPreco('');
        setPercentual('');
        setImageAsUrl('');
        buscaProdutos();
      })
      .catch((error) => {
        alert("Erro ao gravar alteração: " + error)
      })
  }

  function pegaProduto(id) {
    firebase.firestore().collection('produtos')
      .doc(id)
      .onSnapshot((doc) => {
        setIdProduto(id);
        setDescricao(doc.data().descricao);
        setInfo(doc.data().info);
        setPreco(doc.data().preco);
        setPathimagem(doc.data().pathimagem);
        setPercentual(doc.data().percentual);
      })
  }

  const upload = (e) => {
    e.preventDefault();

    const uploadcom = storage.ref(`/imagens/${image.name}`).put(image)

    if (image == null) return;

    uploadcom.on("state_changed", function () {

      uploadcom.snapshot.ref.getDownloadURL().then(function (newurl) {
        setImageAsUrl(newurl)
        console.log("url:" + newurl)
      })

    }, function (error) {
      console.log("Erro ao salvar arquivo!")
    })
  }

  return (
    <ThemeProvider theme={theme}>

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
              variant="h1"
              align="center"
              gutterBottom
              sx={{ color: 'primary.main' }}
            >
              O que você gostaria de fazer com o seu produto?
            </Typography>
            <Typography variant="h2" align="center" color="text.secondary" paragraph>
              Tem alguma dúvida em relação ao seu produto? Fale conosco através das nossas redes sociais! 
            </Typography>
          </Container>

          <Grid container component="main"
            sx={{
              alignItems: 'center', justifyContent: 'space-evenly',
              bgcolor: '#fafafa', alignContent: 'center'
            }}>
            <Stack direction={{ sm: 'row', marginTop: '2%' }}
              spacing={{ xs: 1, sm: 2, md: 12 }} alignItems="center" justifyContent="center">
              <Box sx={{
                maxWidth: '38%',
                border: 2,
                borderRadius: 2,
                boxShadow: 2,
                color: 'primary.main',
                '&:hover': {
                  boxShadow: 6,
                  border: 3,}
              }}>
                <IconButton sx={{ color: 'primary.main', fontSize: 130, marginLeft: '14%' }} variant="rounded">
                  <MonetizationOnSharpIcon fontSize="inherit" />
                </IconButton>
                <Button type="submit" fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'primary' }}
                >Vender</Button>
              </Box>

              <Box sx={{
                maxWidth: '38%',
                borderColor: 'primary.main',
                border: 2,
                borderRadius: 2,
                boxShadow: 2,
                color: 'primary.main',
                '&:hover': {
                  boxShadow: 6,
                  border: 3,}
              }}>
                <IconButton sx={{ color: 'primary.main', fontSize: 130, marginLeft: '14%' }} variant="rounded">
                  <LoyaltyIcon fontSize="inherit" />
                </IconButton>
                <Button type="submit" fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'primary' }}
                >Doar</Button>
              </Box>

            </Stack>
          </Grid>
        </Box>


        <Box
          sx={{
            bgcolor: 'primary.main',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h1"
              align="center"
              gutterBottom
              sx={{ color: 'white' }}
            >
              Qual a situação do seu produto?
            </Typography>
            <Typography variant="h2" align="center" color="#fafafa" paragraph>
              Tem alguma dúvida em relação ao seu produto? Fale conosco através das nossas redes sociais! 
            </Typography>
          </Container>

          <Grid container component="main"
            sx={{
              alignItems: 'center', justifyContent: 'space-evenly',
              bgcolor: 'primary.main', alignContent: 'center'
            }}>
            <Stack direction={{ sm: 'row', marginTop: '2%' }}
              spacing={{ xs: 1, sm: 2, md: 12 }} alignItems="center" justifyContent="center">

              <Box sx={{
                maxWidth: '38%',
                borderColor: 'primary.main',
                border: 2,
                borderRadius: 2,
                boxShadow: 2,
                color: 'white',
                '&:hover': {
                  boxShadow: 6,
                  border: 3,}
              }}>
                <IconButton sx={{ color: 'white', fontSize: 130, marginLeft: '14%' }} variant="rounded">
                  <AssignmentTurnedInIcon fontSize="inherit" />
                </IconButton>
                <Button type="submit" fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'white' }}
                >Usado</Button>
              </Box>

              <Box sx={{
                maxWidth: '38%',
                borderColor: 'primary.main',
                border: 2,
                borderRadius: 2,
                boxShadow: 2,
                color: 'white',
                alignSelf: 'center',
                '&:hover': {
                  boxShadow: 6,
                  border: 3,}
              }}>
                <IconButton sx={{ color: 'white', fontSize: 130, marginLeft: '15%', }} variant="rounded">
                  <AutorenewIcon fontSize="inherit" />
                </IconButton>
                <Button type="submit" fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'white' }}
                >Recondicionado</Button>
              </Box>

              <Box sx={{
                maxWidth: '38%',
                border: 2,
                borderRadius: 2,
                boxShadow: 2,
                color: 'white',
                '&:hover': {
                  boxShadow: 6,
                  border: 3,}
              }}>
                <IconButton sx={{ color: 'white', fontSize: 130, marginLeft: '20%' }} variant="rounded">
                  <BrokenImageIcon fontSize="inherit" />
                </IconButton>
                <Button type="submit" fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'white' }}
                >Estragado</Button>
              </Box>
            </Stack>
          </Grid>
        </Box>


        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid id="cadastroprodbackground"
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'auto',
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
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <BallotIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Descrição do Produto
              </Typography>
              <Box component="form" noValidate sx={{ mt: 3 }}>

                {image ? <Avatar src={URL.createObjectURL(image)} alt="imagem" sx={{ width: 150, height: 150 }} variant="rounded" />
                  :
                  <Avatar src={endImg} alt="imagem" sx={{ width: 150, height: 150 }} variant="rounded" />}
                <br />

                <Button
                  variant="outlined"
                  component="label"
                  onChange={upload}
                  startIcon={<CloudUploadIcon />}
                >
                  Carregar Imagem
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </Button>
                {/*<TextField
            fullWidth
            margin="normal"
            size="small"
            id="outlined-required"
            type="text"
              defaultValue="Local da Imagem" value={imageAsUrl} />*/}

                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required
                  size="small"
                  id="descricao-form"
                  label="Título do Anúncio"
                  value={descricao} onChange={(e) => setDescricao(e.target.value)} />

                <TextField
                  fullWidth
                  required
                  multiline
                  rows={4}
                  margin="normal"
                  size="small"
                  id="outlined-required"
                  label="Descrição do Anúncio"
                  type="text"
                  value={info} onChange={(e) => setInfo(e.target.value)} />

                <TextField

                  required
                  margin="normal"
                  variant="outlined"
                  size="small"
                  id="outlined-required"
                  label="Preco"
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                  value={preco} onChange={(e) => setPreco(e.target.value)} />

                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-required"
                  label="Percentual Repasse"
                  type="text"
                  defaultValue="Local" value={percentual} onChange={(e) => setPercentual(e.target.value)} />

                <Button type="submit" fullWidth variant="contained" disableElevation sx={{ mt: 3, mb: 2, color: 'white' }}
                  onClick={handleAdd}>Confirmar</Button>

                <Button fullWidth variant="outlined" sx={{ mt: 1, mb: 2 }}
                  onClick={editarProduto}>Atualizar Cadastro</Button>

              </Box>
            </Box>
          </Grid>
        </Grid>

      </ThemeProvider >

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Container fixed>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ color: 'primary' }}>
              <TableRow>
                <TableCell align="center">Produto</TableCell>
                <TableCell align="center">Informações</TableCell>
                <TableCell align="center">Preço</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtos.map((produto) => {
                return (
                  <TableRow
                    key={produto.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{produto.descricao}</TableCell>
                    <TableCell align="center">{produto.info}</TableCell>
                    <TableCell align="center">{produto.preco}</TableCell>
                    <Button
                      variant="outlined" startIcon={<DeleteIcon />}
                      onClick={() => pegaProduto(produto.id)}
                      sx={{ margin: 1 }}
                      color="secondary">Alterar</Button>
                  </TableRow>
                )
              })}
            </TableBody>
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Snackbar open={excluir} autoHideDuration={6000} onClose={handleExcluir}>
                <Alert onClose={handleExcluir} severity="error" sx={{ width: '100%' }}>
                  Produto removido com sucesso!
                </Alert>
              </Snackbar>
            </Stack>
          </Table>
        </TableContainer>

      </Container>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Produto cadastrado com sucesso!
          </Alert>
        </Snackbar>
      </Stack>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={aberto} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Erro na gravação do Produto!
          </Alert>
        </Snackbar>
      </Stack>

    </ThemeProvider >
  );
}

export default Admprodutousuario;