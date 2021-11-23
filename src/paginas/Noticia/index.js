import 'firebase/auth';
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { green, orange, grey } from '@material-ui/core/colors';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Stack from '@material-ui/core/Stack'
import { Typography } from '@material-ui/core';
import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Box } from '@material-ui/system';
import { Grid } from '@material-ui/core';


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

const HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
  allArtigos(first: $limit) {
    id
    titulo
    tumbnail {
      responsiveImage(imgixParams: { fit: crop, w: 300, h: 200, auto: format }) {
        aspectRatio
          width
          sizes
          srcSet
          src
          webpSrcSet
          alt
          title
          base64
      }
    }
  }
}`;


function Noticia() {

  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {
    variables: {
      limit: 10
    }
  });
  if (loading) return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex', 
    alignSelf: 'center', 
    top: '50%', 
    left: '50%', 
    position: 'fixed' }}>
  <CircularProgress color="primary" />
  </Box>
  </ThemeProvider>);
  if (error) return "Erro de conexão";


    return (
      <ThemeProvider theme={theme}>
      <><Box
        sx={{
          bgcolor: '#fafafa',
          pt: 8,
          pb: 6,
        }}
      >
        <Typography
          component="h1"
          variant="h1"
          align="center"
          gutterBottom
          sx={{ color: 'primary.main' }}
        >
          Informações
        </Typography>
        <Typography variant="h2" align="center" color="text.secondary" paragraph>
          Confira as principais informações, curiosidades e dicas sobre o descartes de materiais eletrônicos.
        </Typography>
      </Box><Container fixed>

      <Stack justifyContent="center" align="center" direction={{ xs: 'column', sm: 'row', marginTop: '3%' }}
            spacing={{ sm: 2, md: 2, xs: 2 }}>
              
          {data.allArtigos.map(artigo => (
            <Grid
            key={artigo.id}>
              <Card sx={{ maxWidth: 250, minWidth: 50, justifyContent: 'center', alignItems: 'center' }}>
              <Image data={artigo.tumbnail.responsiveImage}/>
                <CardContent>             
                  <Typography gutterBottom variant="h6" component="div">
                    {artigo.titulo}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" fullWidth variant="contained"
                  href={`/info/${artigo.id}`}>Saiba mais</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}</Stack>
        </Container></>
        </ThemeProvider>
    );
}
  
export default Noticia;