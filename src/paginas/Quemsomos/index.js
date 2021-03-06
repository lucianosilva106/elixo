import { createTheme, ThemeProvider  } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import './somos.css';
import { orange, green, grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Stack from '@material-ui/core/Stack';
import { styled } from '@material-ui/core/styles';
import MuiGrid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

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
  fontSize: '1.5rem',
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
theme.typography.h5 = {
  fontSize: '1rem',
  '@media (min-width:600px)': {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.3rem',
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

const Grid2 = styled(MuiGrid)(({ theme }) => ({
  width: '80%',
  ...theme.typography.p,
  align: 'center',
  justifyContent: 'space-evenly',
  '& [role="separator"]': {
    margin: theme.spacing(0, 2,),
  },
}));

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
        Juntos Somos Mais
      </Typography>

<Box align="center" justifyContent="center" sx={{marginTop: '5%'}}>
        <Grid2 container sx={{marginLeft: '10%'}} justifyContent="center">
      <Grid2 item xs >
      <Typography variant="p" align="center" color="text.secondary" paragraph>
      Uma solu????o inovadora e escalon??vel, com foco no segmento de mercado
      espec??fico de descarte de eletr??nicos.
        </Typography>
      </Grid2>
      <Divider orientation="vertical" flexItem>
      <Typography variant="h5" align="center" color="text.secondary">Inova????o</Typography>
      </Divider>
      <Grid2 item xs>
      <Typography variant="p" align="center" color="text.secondary" paragraph>
      Visando facilitar, a solu????o tem como objetivo principal 
      a orienta????o, al??m do direcionamento ?? locais apropriados para o descarte consciente.
        </Typography>
      </Grid2>
    </Grid2>
    <Divider align="center" color="text.secondary">
    <Typography variant="h5" align="center" color="text.secondary">Cultura</Typography>
      </Divider>
      <Grid2 container sx={{marginLeft: '10%'}} justifyContent="center">
      <Grid2 item xs >
      <Typography variant="p" align="center" color="text.secondary" paragraph>
      Uma solu????o inovadora e escalon??vel, com foco no segmento de mercado
      espec??fico de descarte de eletr??nicos.
        </Typography>
      </Grid2>
      <Divider orientation="vertical" flexItem>
      <Typography variant="h5" align="center" color="text.secondary">Transforma????o</Typography>
      </Divider>
      <Grid2 item xs>
      <Typography variant="p" align="center" color="text.secondary" paragraph>
      Visando facilitar, a solu????o tem como objetivo principal 
      a orienta????o, al??m do direcionamento ?? locais apropriados para o descarte consciente.
        </Typography>
      </Grid2>
    </Grid2>
    </Box>

        </Box>
 
        <Grid container component="main" 
      sx={{ alignItems: 'center', height: '400px', justifyContent: 'center', 
      bgcolor: '#fafafa', }}>
        <Stack direction={{  sm: 'row' }} 
        spacing={{ xs: 1, sm: 2, md: 6 }} alignItems="center" justifyContent="space-evenly">        
        <Box sx={{
          maxWidth: '38%',
          marginLeft: '5%'
        }}>
          <Typography variant="h1" sx={{ color: 'textos.main' }}>Miss??o, Vis??o e Valores</Typography>
          <Typography variant="p" sx={{ color: 'text.secondary' }}>A solu????o tem como objetivo promover uma mudan??a cultural dos indiv??duos sobre a import??ncia 
            do descarte sustent??vel do lixo eletr??nico.</Typography>
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
        spacing={{ xs: 1, sm: 2, md: 6 }} alignItems="center" justifyContent="space-evenly">  
        <Box id="image2"
          item
          sx={{
            minWidth: 300,
            minHeight: 300,
            backgroundRepeat: 'no-repeat',
          }}
        />           
        <Box sx={{
          maxWidth: '30%',
        }}>
          <Typography variant="h1" sx={{ color: 'textos.main', marginRight: '5%', }}>Descarte correto</Typography>
          <Typography variant="p" sx={{ color: 'text.secondary', marginRight: '5%', }}>Voltado para quem n??o tem acesso ??s informa????es de como deve ser o descarte de pe??as eletr??nicas obsoletas, 
          manuten????es ou em desuso.</Typography>
        </Box>
        </Stack>
      </Grid>

      </ThemeProvider>
  
    );
  }
  
  export default Quemsomos;

