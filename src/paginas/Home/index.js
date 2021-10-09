import { Link } from "react-router-dom";
import './home.css'
import { createTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import firebase from '../../firebaseConnection';
import { useEffect, useState } from 'react';
import { TextField } from "@material-ui/core";
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

export default function Home() {

  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [tipolixo, setTipolixo] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function handleAdd() {
    await firebase.firestore().collection('propostas')
      .add({
        nome: nome,
        cep: cep,
        endereco: endereco,
        bairro: bairro,
        tipolixo: tipolixo,
        mensagem: mensagem
      })
      .then(() => {
        alert('Solicitação de Posto de Coleta recebido com sucesso!');
        setNome('');
        setCep('');
        setEndereco('');
        setBairro('');
        setTipolixo('');
        setMensagem('');
      })
      .catch((error) => {
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
          <p> <font color="Green"> Você tem lixo eletrônico em casa? </font></p>
        </h2>
        <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
        Saiba mais</Button>
      </div>
      <div align="right">
        <h2>
          <p> <font color="Green"> Sabe quanto vale seu lixo eletrônico? </font> </p>
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
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/src/img/sejapostocoleta.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
      
        > <h1>Seja um Parceiro</h1> </Grid>
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
                fullWidth
                margin="normal"
                size="small"
                id="outlined-required"
                label="CEP"
                type="text"
                defaultValue="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />

              <TextField
                fullWidth
                margin="normal"
                size="small"
                id="outlined-required"
                label="Endereço"
                type="text"
                defaultValue="Rua" value={endereco} onChange={(e) => setEndereco(e.target.value)} />



              <TextField
                fullWidth
                margin="normal"
                size="small"
                id="outlined-required"
                label="Bairro"
                type="text"
                defaultValue="Rua" value={bairro} onChange={(e) => setBairro(e.target.value)} />

              <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
              <Select
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



              <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}
                onClick={handleAdd}>Enviar Formulário</Button><br />

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider >

  );
}
