import { Link } from "react-router-dom";
import * as React from 'react';
import './home.css'
import { createTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import firebase from "../../firebaseConnection";
import { useEffect, useState } from 'react';
import { Fade, TextField } from "@material-ui/core";
import { orange, green } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
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

function Home() {

  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [tipolixo, setTipolixo] = useState('');
  const [mensagem, setMensagem] = useState('');

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  const [open, setOpen, aberto] = React.useState(false);


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  async function handleAdd() {
    await firebase.firestore().collection('propostas')
      .add({
        nome: nome,
        cep: cep,
        endereco: endereco,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        tipolixo: tipolixo,
        mensagem: mensagem
      })
      .then(() => {
        handleClick();
        setNome('');
        setCep('');
        setEndereco('');
        setBairro('');
        setCidade('');
        setEstado('');
        setTipolixo('');
        setMensagem('');
      })
      .catch((error) => {
        handleClick();
        console.log('ERRO: ' + error);
      })
  }


  return (
    <ThemeProvider theme={theme}>
      <br />
      <div>
        <img className="logohome"></img>
      </div>

      <div align="left">
        <h2>
          <p> <font color="Green"> Você tem descarte eletrônico em casa? </font></p>
        </h2>
        <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
          Saiba mais</Button>
      </div>

      <div align="right">
        <h2>
          <p> <font color="Green"> Sabe quanto vale seu descarte eletrônico? </font> </p>
        </h2>
        <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
          Saiba mais</Button>
      </div>
      <div align="center">
        <h3>
          <p> Entenda abaixo como nosso projeto funciona.</p>
        </h3>

      </div>

      <div>
        <img className="resumoprojeto"></img>
      </div>

      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid id="imgcontato"
          item
          xs={false}
          sm={4}
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
                <h2>Seja um Parceiro</h2>
                <TextField
                  fullWidth
                  margin="normal"
                  required
                  size="small"
                  id="outlined-required"
                  label="Empresa"
                  defaultValue="Empresa"
                  value={nome} onChange={(e) => setNome(e.target.value)} />

                <TextField
                  required
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-required"
                  label="CEP"
                  type="text"
                  defaultValue="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />

                <TextField
                  required
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-required"
                  label="Endereço"
                  type="text"
                  defaultValue="Rua" value={endereco} onChange={(e) => setEndereco(e.target.value)} />

                <TextField
                  required
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-required"
                  label="Bairro"
                  type="text"
                  defaultValue="Rua" value={bairro} onChange={(e) => setBairro(e.target.value)} />

                <TextField
                  required
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-required"
                  label="Cidade"
                  type="text"
                  defaultValue="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />

                <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
                <Select
                  required
                  fullWidth
                  margin="normal"
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

                <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
                <Select
                  required
                  fullWidth
                  margin="normal"
                  size="small"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={tipolixo}
                  label="Categoria"
                  onChange={(e) => setTipolixo(e.target.value.toString())}
                >
                  <MenuItem value="">
                  </MenuItem>
                  <MenuItem value={10}>Pequeno</MenuItem>
                  <MenuItem value={20}>Médio</MenuItem>
                  <MenuItem value={30}>Grande</MenuItem>
                </Select>
                <FormHelperText>Tamanho do material recebido</FormHelperText>

                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="outlined-textarea"
                  label="Deixe a sua mensagem"
                  placeholder="Mensagem"
                  multiline value={mensagem} onChange={(e) => setMensagem(e.target.value)} />

                <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}
                  onClick={handleAdd}>Enviar Formulário</Button><br />

            </Box>
          </Box>
        </Grid>
      </Grid>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Solicitação de Posto de Coleta enviada com sucesso!
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={aberto} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Erro de preenchimento da solicitação!
            </Alert>
          </Snackbar>
        </Stack>

    </ThemeProvider >

  );
}

export default Home;