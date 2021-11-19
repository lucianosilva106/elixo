import { createTheme, ThemeProvider, responsiveFontSizes  } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import './somos.css';
import { orange, green, grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Stack from '@material-ui/core/Stack'


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

function Quemsomos() {

  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        pt: 8,
        pb: 6,
      }}
    >
      <Box id="imagemain"
          sx={{
            backgroundRepeat: 'no-repeat',
            minWidth: 300,
            minHeight: 300,
          }}/>
      <Typography
        component="h1"
        variant="h1"
        align="center"
        gutterBottom
        sx={{ color: 'primary.main' }}
      >
        Juntos Somos Mais!
      </Typography>
        <Typography variant="h4" align="center" color="text.secondary" paragraph>
           <p>
              Esta plataforma traz uma solução Web inovadora e escalonável, com foco no segmento de mercado 
              específico de descarte de eletrônicos. </p>
           <p>
              Com base nos levantamentos e pesquisas realizadas no decorrer do projeto, 
              foi identificado o problema cultural no qual as pessoas muitas vezes não sabem o que é 
              e como descartar corretamente o lixo eletrônico. Visando facilitar esse processo, 
              a solução web tem como cerne inicial a orientação dessas pessoas, 
              além de direcioná-las à locais apropriados para o descarte consciente. </p>
        </Typography>
        </Box>
 
        <Grid container component="main" 
      sx={{ alignItems: 'center', height: '400px', justifyContent: 'center', 
      bgcolor: '#fafafa', }}>
        <Stack direction={{  sm: 'row' }} 
        spacing={{ xs: 1, sm: 2, md: 30 }} alignItems="center" justifyContent="space-evenly">        
        <Box sx={{
          maxWidth: '38%',
          marginLeft: '5%'
        }}>
          <Typography variant="h1" sx={{ color: 'textos.main' }}>Missão, Visão e Valores</Typography>
          <Typography variant="p" sx={{ color: 'textos.main' }}>A solução tem como objetivo promover uma mudança cultural dos indivíduos sobre a importância 
            do descarte sustentável do lixo eletrônico.</Typography>
        </Box>

        <Box id="image1"
          sx={{
            backgroundRepeat: 'no-repeat',
            minWidth: 300,
            minHeight: 300,
          }}/>
        </Stack>
      </Grid>
      <Grid container justifyItems="center" component="main" sx={{ bgcolor: '#DEFFE5', alignItems: 'center', height: '400px', justifyContent: 'center' }}>
      <Stack direction={{  sm: 'row' }} 
        spacing={{ xs: 1, sm: 2, md: 30 }} alignItems="center" justifyContent="space-evenly">  
        <Box id="image2"
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
          <Typography variant="h1" sx={{ color: 'textos.main', marginRight: '5%', }}>Descarte correto</Typography>
          <Typography variant="p" sx={{ color: 'textos.main', marginRight: '5%', }}>Voltado para quem não tem acesso às informações de como deve ser o descarte de peças eletrônicas obsoletas, 
          manutenções ou em desuso.</Typography>
        </Box>
        </Stack>
      </Grid>
        

      </ThemeProvider>
  
    );
  }
  
  export default Quemsomos;

