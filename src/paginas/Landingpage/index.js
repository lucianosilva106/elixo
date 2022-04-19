import 'firebase/auth';
import 'firebase/storage';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { IconButton, TextField, Select, MenuItem, 
  FormControlLabel, Checkbox, Avatar, InputLabel } from "@material-ui/core";
  import CssBaseline from '@material-ui/core/CssBaseline';
  import HowToRegIcon from '@material-ui/icons/HowToReg';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Stack from '@material-ui/core/Stack';
import Container from '@material-ui/core/Container';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import DevicesIcon from '@material-ui/icons/Devices';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import PanToolIcon from '@material-ui/icons/PanTool';
import AssistantIcon from '@material-ui/icons/Assistant';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import { Typography } from '@material-ui/core';
import { orange, green, grey } from '@material-ui/core/colors';
import './landingpage.css';


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
    fontSize: '4.0rem',
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
theme.typography.h3 = {
  fontSize: '1.8rem',
  '@media (min-width:600px)': {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
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

function Landingpage() {

  const openlogin = () => {
    window.location.href='./login';
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
        <Container fixed>
          <Grid id="grid-bg1" container component="main" align="left"
            sx={{ alignItems: 'center', height: '450px', justifyContent: 'center' }}>
            <Stack direction={{ sm: 'row' }}
              spacing={{ xs: 1, sm: 2, md: 12 }} alignItems="center" justifyContent="space-evenly">
              <Box sx={{
                maxWidth: '50%',
              }}>
                <Typography variant="h1" sx={{ color: 'textos.main' }}>{`Loja de materiais eletrônicos usados.`}</Typography>
                <Typography variant="p" sx={{ color: 'textos.main' }}>{`Você tem em casa um computador, um celular 
                ou algum equipamento eletrônico em desuso guardado numa gaveta ou caixa? Vem pra Re-user!`}</Typography><br/>
                <Button variant="contained" disableElevation sx={{ mt: 3, mb: 2, color: 'white', }} onClick={openlogin}>
                  Acessar</Button>
                <Button variant="outlined" sx={{ mt: 3, mb: 2, color: 'primary.main', borderColor: 'primary.main', marginLeft: '3%' }}>
                  Saiba mais</Button>
              </Box>

              <Box id="landingpage1"
                sx={{
                  backgroundRepeat: 'no-repeat',
                  minWidth: 450,
                  minHeight: 400,
                }} />
            </Stack>
          </Grid>
        </Container>
      </Box>


      <Paper>

        <Grid container component="main"
          sx={{
            justifyContent: 'space-around',
            bgcolor: 'primary.main',
            alignContent: 'center',
            minHeight: '400px'
          }}>
          <Stack direction={{
            xs: 'column', sm: 'row', marginTop: '2%',
            maxWidth: '85%', paddingBottom: 10
          }}
            spacing={{ xs: 1, sm: 2, md: 12 }} >

            <Box sx={{
              textAlign: 'center',
              color: 'white',
              alignItems: 'center'
            }}>
              <IconButton id="btnicon" sx={{ color: 'white', fontSize: 80, }} variant="rounded">
                <OfflineBoltIcon fontSize="inherit" />
              </IconButton>
              <Button fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'white' }}
              >Sustentabilidade</Button>
              <Typography variant="p" sx={{ color: 'white', }}>{`Uma solução inovadora e escalonável, 
                com foco no segmento de mercado específico de componentes eletrônicos usados ou descartados.`}</Typography>
            </Box>

            <Box sx={{
              textAlign: 'center',
              color: 'white',
            }}>
              <IconButton id="btnicon" sx={{ color: 'white', fontSize: 80, }} variant="rounded">
                <DevicesIcon fontSize="inherit" />
              </IconButton>
              <Button fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'white' }}
              >Produtos Acessíveis</Button>
              <Typography variant="p" sx={{ color: 'white', }}>{`Componentes compatíveis com diversos equipamentos, sendo modernos ou não, trazendo uma
                diversividade para o mercado de usados com preços que cabem no bolso.`}</Typography>
            </Box>

            <Box sx={{
              textAlign: 'center',
              color: 'white',
            }}>
              <IconButton id="btnicon" sx={{ color: 'white', fontSize: 80, }} variant="rounded">
                <FlipCameraAndroidIcon fontSize="inherit" />
              </IconButton>
              <Button type="submit" fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'white' }}
              >Economia Circular</Button>
              <Typography variant="p" sx={{ color: 'white', }}>{`Já pensou em ganhar dinheiro vendendo seus equipamentos usados? A Re-user te ajuda nessa!
                Oferecemos uma comunicação direta entre vendedores e compradores da sua região.`}</Typography>
            </Box>

          </Stack>
        </Grid>
      </Paper>

      <Box
          sx={{
            pt: 8,
            pb: 3,
            bgcolor: "#fafafa"
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              gutterBottom
              sx={{ color: 'textos.main', }}
            >
              Nossa plataforma oferece:
            </Typography>
          </Container>
        </Box>

      <Paper elevation={0}>

        <Grid container component="main"
          sx={{
            justifyContent: 'space-around',
            bgcolor: '#fafafa',
            alignContent: 'center',
            minHeight: '400px'
          }}>
          <Stack direction={{
            xs: 'column', sm: 'row', marginTop: '2%',
            maxWidth: '85%', paddingBottom: 10
          }}
            spacing={{ xs: 1, sm: 2, md: 12 }} >

            <Box sx={{
              textAlign: 'center',
              color: 'primary.main',
              alignItems: 'center'
            }}>
              <IconButton sx={{ color: 'secondary.main', fontSize: 40}} variant="rounded">
                <AssistantIcon fontSize="inherit" />
              </IconButton>
              <Button fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'textos.main' }}
              >Praticidade</Button>
              <IconButton sx={{ color: 'secondary.main', fontSize: 40, }} variant="rounded">
                <PanToolIcon fontSize="inherit" />
              </IconButton>
              <Button fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'textos.main' }}
              >Acessibilidade</Button>
              <IconButton sx={{ color: 'secondary.main', fontSize: 40, }} variant="rounded">
                <AttachMoneyIcon fontSize="inherit" />
              </IconButton>
              <Button fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'textos.main' }}
              >Preço</Button>
            </Box>

            <Box sx={{
              align: 'center',
            }}>
              <Box id="landingpage2"
                sx={{
                  backgroundRepeat: 'no-repeat',
                  minWidth: 500,
                  minHeight: 500,
                  marginTop: '-15%'
                }} />
            </Box>

            <Box sx={{
              textAlign: 'center',
              color: 'primary.main',
              alignItems: 'center'
            }}>
              <IconButton sx={{ color: 'secondary.main', fontSize: 40, }} variant="rounded">
                <AssignmentIndIcon fontSize="inherit" />
              </IconButton>
              <Button fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'textos.main' }}
              >Vendedores Locais</Button>
              <IconButton sx={{ color: 'secondary.main', fontSize: 40, }} variant="rounded">
                <LocalShippingIcon fontSize="inherit" />
              </IconButton>
              <Button fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'textos.main' }}
              >Entrega Rápida</Button>
              <IconButton sx={{ color: 'secondary.main', fontSize: 40, }} variant="rounded">
                <AllInboxIcon fontSize="inherit" />
              </IconButton>
              <Button fullWidth variant="text" disableElevation sx={{ mt: 0, mb: 2, color: 'textos.main' }}
              >Produtos Especializados</Button>
            </Box>

          </Stack>
        </Grid>
      </Paper>

      <Box
          sx={{
            pt: 8,
            pb: 5,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              gutterBottom
              sx={{ color: 'textos.main', }}
            >
              Gostaria de vender um produto?
            </Typography>
            <Typography variant="h5" align="center" sx={{ color: 'textos.main' }} paragraph>
              Entre em contato conosco para dúvidas e sugestões de compras e vendas. 
            </Typography>
          </Container>
        </Box>

        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                  fullWidth
                  required
                  size="small"
                  id="cliente-form"
                  label="Nome e Sobrenome"
                  autoComplete='cliente'
                   />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  fullWidth
                  required
                  size="small"
                  id="email-form"
                  label="Email"
                  type="email"
                  autoComplete='email'
                   />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  fullWidth
                  size="small"
                  id="outlined-required"
                  label="Endereço"
                  type="text"
                   />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  size="small"
                  id="outlined-required"
                  label="CEP"
                  type="number"
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  size="small"
                  id="outlined-required"
                  label="Bairro"
                  type="text"
                   />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  fullWidth
                  size="small"
                  id="outlined-required"
                  label="Cidade"
                  type="text"
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
              <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
                <Select
                  fullWidth
                  size="small"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Estado"
                  
                >
                  <MenuItem value="">
                  </MenuItem>
                  <MenuItem value={'SP'}>São Paulo</MenuItem>
                  <MenuItem value={'RJ'}>Rio de Janeiro</MenuItem>
                  <MenuItem value={'MG'}>Minas Gerais</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
              margin='normal'
                  fullWidth
                  size="small"
                  id="outlined-textarea"
                  label="Whatsapp"
                  placeholder="Contato"
                  type="tel" />
              </Grid>
            </Grid>
            <Button fullWidth variant="contained" disableElevation sx={{ mt: 3, mb: 2, color: 'white' }}
                  >Enviar</Button>
          </Box>
        </Box>
      </Container>

    </ThemeProvider>
  )
}

export default Landingpage;