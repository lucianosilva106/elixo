
import './home.css'
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import firebase from '../../firebaseConnection';
import {useState} from 'react';
import {TextField} from "@material-ui/core";
import {orange, green} from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import {InputLabel} from "@material-ui/core";
const PropostaCollection = firebase.firestore().collection("propostas")

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
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [tipolixo, setTipolixo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function handleAdd() {
    try {
      const body = {
        nome: nome,
        cep: cep,
        endereco: endereco,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        tipolixo: tipolixo,
        mensagem: mensagem,
        categoria: categoria
      }
      await PropostaCollection.add(body)

      alert('Solicitação de Posto de Coleta recebido com sucesso!');
      limparCampos()
    } catch (error) {
      console.log('ERRO: ' + error);
    }
  }

  function limparCampos() {
    setNome('');
    setCep('');
    setEndereco('');
    setBairro('');
    setCidade('');
    setEstado('');
    setTipolixo('');
    setMensagem('');
    setCategoria('');
  }

  return (
    <ThemeProvider theme={theme}>
      <br/>
      <div>
        <img className="logohome"></img>
      </div>

      <div align="left">
        <h2>
          <p><font color="Green"> Você tem lixo eletrônico em casa? </font></p>
        </h2>
        <Button type="submit" variant="outlined" sx={{mt: 3, mb: 2}}>
          Saiba mais</Button>
      </div>
      <div align="right">
        <h2>
          <p><font color="Green"> Sabe quanto vale seu lixo eletrônico? </font></p>
        </h2>
        <Button type="submit" variant="outlined" sx={{mt: 3, mb: 2}}>
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

      <Grid container component="main" sx={{height: '100vh'}}>
        <CssBaseline/>
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
            <Box component="form" noValidate sx={{mt: 1}}>
              <h2>Seja um Parceiro</h2>
              <TextField
                fullWidth
                margin="normal"
                required
                size="small"
                id="outlined-required"
                label="Empresa"
                defaultValue="Empresa"
                value={nome} onChange={(e) => setNome(e.target.value)}/>

              <TextField
                fullWidth
                margin="normal"
                size="small"
                id="outlined-required"
                label="CEP"
                type="text"
                defaultValue="CEP" value={cep} onChange={(e) => setCep(e.target.value)}/>

              <TextField
                fullWidth
                margin="normal"
                size="small"
                id="outlined-required"
                label="Endereço"
                type="text"
                defaultValue="Rua" value={endereco} onChange={(e) => setEndereco(e.target.value)}/>

              <TextField
                fullWidth
                margin="normal"
                size="small"
                id="outlined-required"
                label="Bairro"
                type="text"
                defaultValue="Rua" value={bairro} onChange={(e) => setBairro(e.target.value)}/>

<TextField
                fullWidth
                margin="normal"
                size="small"
                id="outlined-required"
                label="Cidade"
                type="text"
                defaultValue="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)}/>

<TextField
                fullWidth
                margin="normal"
                size="small"
                id="outlined-required"
                label="Estado"
                type="text"
                defaultValue="Estado" value={estado} onChange={(e) => setEstado(e.target.value)}/>

              <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
              <Select
                fullWidth
                margin="normal"
                size="small"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={categoria}
                label="Categoria"
                onChange={(e) => setCategoria(e.target.value.toString())}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={"Pequeno"}>Pequeno</MenuItem>
                <MenuItem value={"Médio"}>Médio</MenuItem>
                <MenuItem value={"Grande"}>Grande</MenuItem>
              </Select>
              <FormHelperText>Tamanho do material recebido</FormHelperText>


              <InputLabel id="demo-simple-select-helper-label">Tipo Lixo</InputLabel>
              <Select
                fullWidth
                margin="normal"
                size="small"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={tipolixo}
                label="Tipo Lixo"
                onChange={(e) => setTipolixo(e.target.value.toString())}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={"Papel"}>Papel</MenuItem>
                <MenuItem value={"Plástico"}>Plástico</MenuItem>
                <MenuItem value={"Vidro"}>Vidro</MenuItem>
                <MenuItem value={"Aluminio"}>Aluminio</MenuItem>
              </Select>


              <TextField
                fullWidth
                margin="normal"
                size="small"
                id="outlined-textarea"
                label="Deixe a sua mensagem"
                placeholder="Mensagem"
                multiline value={mensagem} onChange={(e) => setMensagem(e.target.value)}/>


              <Button fullWidth variant="outlined" sx={{mt: 3, mb: 2}}
                      onClick={handleAdd}>Enviar Formulário</Button><br/>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>

  );
}