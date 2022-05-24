import firebase from '../../firebaseConnection';
import 'firebase/auth';
import 'firebase/storage';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { TextField, Container, Typography, IconButton, 
  Avatar, FormControlLabel, Checkbox, Link, Input } from "@material-ui/core";
import { orange, blueGrey } from '@material-ui/core/colors';
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
import MonetizationOnSharpIcon from '@material-ui/icons/MonetizationOnSharp';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { green, grey } from '@material-ui/core/colors';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


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


function Meucadastro() {

  const [idusuario, setIdusuario] = useState('');
  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [pathimagem, setPathimagem] = useState('');

  var storage = firebase.storage();
  const [image, setImage] = useState('');
  const [endImg] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState('');

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
    async function checkLogin() {
      await firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          await firebase.firestore().collection('usuarios')
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setIdusuario(user.uid)
              setNome(snapshot.data().nome)
              setCep(snapshot.data().cep)
              setEndereco(snapshot.data().endereco)
              setBairro(snapshot.data().bairro)
              setCidade(snapshot.data().cidade)
              setEstado(snapshot.data().estado)
              setWhatsapp(snapshot.data().whatsapp)
              setPathimagem(snapshot.data().pathimagem)
            })
        } else {
          firebase.auth().signOut();
          localStorage.clear();
          window.location.href = '/login';
        }
      })
    }

    checkLogin();

  }, [])

  async function atualizaUsuario() {
//    alert(imageAsUrl)
    await firebase.firestore().collection('usuarios')
      .doc(idusuario)
      .update({
        nome: nome,
        cep: cep,
        endereco: endereco,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        whatsapp: whatsapp,
        pathimagem: imageAsUrl
      })
    firebase.firestore().collection('usuarios')
      .doc(idusuario)
      .get()
      .then((snapshot) => {
        setNome(snapshot.data().nome)
        setCep(snapshot.data().cep)
        setEndereco(snapshot.data().endereco)
        setBairro(snapshot.data().bairro)
        setCidade(snapshot.data().cidade)
        setEstado(snapshot.data().estado)
        setWhatsapp(snapshot.data().whatsapp)
        setPathimagem(snapshot.data().pathimagem)
      })
  }

  function voltarMenu() {
    window.location.href = '/gerenciamentousuario';
  }

  const upload = () => {

    const uploadcom = storage.ref(`/imagens/${image.name}`).put(image)

    if (image == null) return;

    uploadcom.on("state_changed", function () {

      uploadcom.snapshot.ref.getDownloadURL().then(function (newurl) {
        setImageAsUrl(newurl)
        console.log("url:" + newurl)
      })
//      alert(imageAsUrl)

    }, function (error) {
      console.log("Erro ao salvar arquivo!")
    })
  }

  const UploadGeral = () => {
    setImage(nome);
    upload();
  };

  return (
    <ThemeProvider theme={theme}>

      <Box
        sx={{
          bgcolor: '#fafafa',
          pt: 8,
          pb: 10,
        }}
      >

        <Grid container component="main"
          sx={{
            alignItems: 'center', justifyContent: 'space-evenly',
            bgcolor: '#fafafa', alignContent: 'center',
          }}>
          <Stack direction={{ xs: 'column', sm: 'row', marginTop: '2%', }}
            spacing={{ xs: 1, sm: 2, md: 12 }}>

          </Stack>
        </Grid>
      </Box>

      <Box
        sx={{
          pt: 8,
          pb: 6,
        }}
      >
        <Grid container component="main"
          sx={{
            alignItems: 'center', justifyContent: 'center', alignContent: 'center',
          }}>
          <Stack direction={{ sm: 'row', }}>
            <Avatar src={pathimagem} alt="imagem" sx={{ width: 160, height: 160, border: 2, borderColor: 'primary.main', marginTop: '-85%', }} />

          </Stack>
        </Grid>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h1"
            align="center"
            gutterBottom
            sx={{ color: 'primary.main', marginTop: '2%' }}
          >
            {localStorage.getItem('nomelogado')}
          </Typography>
          <Typography variant="h2" align="center" color="text.secondary" paragraph>
            Meus Dados de Cadastro
          </Typography>
        </Container>
      </Box>


      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Input type="file" onChange={(e) =>{setImage(e.target.files[0])}} />
          <Button
            variant="outlined"
            component="file"
            onClick={upload}
            startIcon={<CloudUploadIcon />}
          >Carregar Imagem</Button>

          <TextField
            margin="normal"
            fullWidth
            required
            size="small"
            id="usuario-form"
            label="Usuario"
            defaultValue="Usuario"
            value={nome} onChange={(e) => setNome(e.target.value)} />

          <TextField

            margin="normal"
            fullWidth
            size="small"
            id="outlined-required"
            label="CEP"
            type="text"
            defaultValue="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />

          <TextField

            margin="normal"
            fullWidth
            size="small"
            id="outlined-required"
            label="Endereço"
            type="text"
            defaultValue="Rua" value={endereco} onChange={(e) => setEndereco(e.target.value)} />


          <TextField

            margin="normal"
            fullWidth
            size="small"
            id="outlined-required"
            label="Bairro"
            type="text"
            defaultValue="Rua" value={bairro} onChange={(e) => setBairro(e.target.value)} />

          <TextField

            margin="normal"
            fullWidth
            size="small"
            id="outlined-required"
            label="Cidade"
            type="text"
            defaultValue="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />


          <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
          <Select

            margin="normal"
            fullWidth
            size="small"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={estado}
            label="Estado"
            onChange={(e) => setEstado(e.target.value.toString())}
          >
            <MenuItem value="">
            </MenuItem>
            <MenuItem value={'SP'}>São Paulo</MenuItem>
            <MenuItem value={'RJ'}>Rio de Janeiro</MenuItem>
            <MenuItem value={'MG'}>Minas Gerais</MenuItem>
          </Select>

          <TextField

            margin="normal"
            fullWidth
            size="small"
            id="outlined-required"
            label="Whatsapp"
            type="text"
            defaultValue="Whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
          <br />

          <Button variant="contained" fullWidth disableElevation sx={{ mt: 1, mb: 2, color: 'white', justifyContent: 'center' }}
            onClick={atualizaUsuario}>Salvar</Button>

          <Button variant="outlined" fullWidth disableElevation size="small" sx={{ justifyContent: 'center' }}
            onClick={voltarMenu}>Cancelar</Button>


        </Box>

      </Container>



      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Usuário / Cliente atualizado com sucesso!
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
    </ThemeProvider>

  );
}

export default Meucadastro;