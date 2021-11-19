import * as React from 'react';
import './home.css'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import firebase from "../../firebaseConnection";
import { useState } from 'react';
import { TextField, Typography } from "@material-ui/core";
import { orange, green, grey } from '@material-ui/core/colors';
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
import { Container } from "react-bootstrap";
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
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

<a href="https://storyset.com/marketing">Marketing illustrations by Storyset</a>

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
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

  const [clicksm1, setClicksm1] = React.useState(false);

  const handleClicksm1 = () => {
    setClicksm1(true);
  };

  const closeClicksm1 = () => {
    setClicksm1(false);
  };

  const closeClicksm2 = () => {
    window.location.href='./quemsomos';
  };

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

  const card1 = (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <CardContent>
        <Typography variant="h2" component="div" sx={{color: 'primary.main'}}>
          + 53 milhões
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="p">
        de toneladas de eletrônicos descartados
        </Typography>
      </CardContent>
      </ThemeProvider>
    </React.Fragment>
  );
  const card2 = (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <CardContent>
        <Typography variant="h2" component="div" sx={{color: 'primary.main'}}>
          7 milhões
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="p">
        de toneladas de lixo eletrônico até 2030
        </Typography>
      </CardContent>
      </ThemeProvider>
    </React.Fragment>
  );
  const card3 = (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <CardContent>
        <Typography variant="h2" component="div" sx={{color: 'primary.main'}}>
          17,4%
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="p">
        foram coletados e reciclados
        </Typography>
      </CardContent>
      </ThemeProvider>
    </React.Fragment>
  );
  const card4 = (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <CardContent>
        <Typography variant="h2" component="div" sx={{color: 'primary.main'}}>
          2 milhões
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="p">
        de toneladas de eletrônicos descartados no Brasil
        </Typography>
      </CardContent>
      </ThemeProvider>
    </React.Fragment>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container fixed>
      <Grid container component="main" align="center" 
      sx={{ alignItems: 'center', height: '400px', justifyContent: 'center' }}>
        <Stack direction={{  sm: 'row' }} 
        spacing={{ xs: 1, sm: 2, md: 30 }} alignItems="center" justifyContent="space-evenly">        
        <Box sx={{
          maxWidth: '38%',
          marginLeft: '5%'
        }}>
          <Typography variant="h1" sx={{ color: 'textos.main' }}>{`Você tem materiais
        eletrônicos em casa?`}</Typography>
          <Button onClick={handleClicksm1} variant="outlined" sx={{ mt: 3, mb: 2 }}>
            Saiba mais</Button>

          {clicksm1 && (
            <div>
              <p> <font color="Green">Você sabia que os equipamentos eletrônicos além de poluir o meio ambiente, tem substancias nocivas a sua saúde?</font></p>
              <p> <font color="Green">A pesquisa de Resíduos eletrônicos no Brasil – 2021, promovida pela Green Eletron, gestora sem fins lucrativos de logística reversa de eletroeletrônicos e pilhas, </font></p>
              <p> <font color="Green">em parceria com a Radar Pesquisa, sobre o cenário do lixo eletrônico no país, aponta que 87% dos brasileiros possui alguma noção sobre lixo eletrônico, porém 33% acredita </font> </p>
              <p> <font color="Green">que existe uma relação entre esse lixo e elementos do meio digital, como spam, e-mails, fotos ou arquivos. Para outros 42% dos entrevistados o lixo eletrônico consiste em </font></p>
              <p> <font color="Green">aparelhos eletrônicos e eletrodomésticos sem funcionamento e 3% acreditam que são todos os equipamentos que já foram descartados, inclusive os que foram parar em locais inadequados. </font></p>
              <Button onClick={closeClicksm1} variant="outlined" sx={{ mt: 3, mb: 2 }}>
                Fechar</Button>
            </div>
          )}
        </Box>

        <Box id="homebackground1"
          sx={{
            backgroundRepeat: 'no-repeat',
            minWidth: 300,
            minHeight: 300,
          }}/>
        </Stack>
      </Grid>
      <Grid container align="center" justifyItems="center" component="main" sx={{ bgcolor: '#DEFFE5', alignItems: 'center', height: '400px', justifyContent: 'center' }}>
      <Stack direction={{  sm: 'row' }} 
        spacing={{ xs: 1, sm: 2, md: 30 }} alignItems="center" justifyContent="space-evenly">  
        <Box id="homebackground2"
          item
          sx={{
            minWidth: 350,
            minHeight: 350,
            backgroundRepeat: 'no-repeat',
          }}
        />
              
        <Box sx={{
          maxWidth: '30%',
        }}>
          <Typography variant="h1" sx={{ color: 'textos.main', 
          marginRight: '5%',}}>{`Sabe quanto vale
      seu lixo eletrônico?`}</Typography>
          <Button onClick={closeClicksm2} variant="outlined" sx={{ mt: 3, mb: 2, marginRight: '5%', }}>
            Saiba mais</Button>
        </Box>
        </Stack>
      </Grid>
      </Container>

      <Grid container component="main" align="center" 
      sx={{ alignItems: 'center', height: '420px', justifyContent: 'center' }}>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}
          sx={{justifyContent: 'center'}}>
            <Box sx={{ minWidth: "20%" }}>
              <Card variant="outlined2"
              sx={{
              }}>{card1}</Card>
            </Box>
            <Box sx={{ minWidth: "20%" }}>
              <Card variant="outlined2"
              sx={{
              }}>{card2}</Card>
            </Box>
            <Box sx={{ minWidth: "20%" }}>
              <Card variant="outlined2"
              sx={{
              }}>{card3}</Card>
            </Box>
            <Box sx={{ minWidth: "20%" }}>
              <Card variant="outlined2"
              sx={{
              }}>{card4}</Card>
            </Box>
          </Stack>
          </Grid>

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
              <Typography variant="h2">Seja um Parceiro</Typography>
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