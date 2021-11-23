import 'firebase/auth';
import React from "react";
import Container from '@material-ui/core/Container';
import { green, orange, grey } from '@material-ui/core/colors';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/system';
import './info.css';

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
    publicada
      titulo
      descricao
      tumbnail {
        responsiveImage(imgixParams: { fit: crop, w: 1000, h: 250, auto: format }) {        
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

  

function Info() {
    

    const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {
        variables: {
            limit: 1
        }
    });
    if (loading) return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: 'flex',
                alignSelf: 'center',
                top: '50%',
                left: '50%',
                position: 'fixed'
            }}>
                <CircularProgress color="primary" />
            </Box>
        </ThemeProvider>);
    if (error) return "Erro de conexão";


    return (
        <ThemeProvider theme={theme}>
            {data.allArtigos.map(artigo => (             
               <><Box
                    sx={{
                        bgcolor: '#fafafa',
                        pt: 6,
                        pb: 4,
                    }}
                >
                    <Container maxWidth="lg">
                    <Typography
                            variant="p" align="center" color="text.secondary"
                            gutterBottom paragraph>
                            {artigo.publicada}
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h1"
                            align="center"
                            gutterBottom
                            sx={{ color: 'primary.main' }}
                        >
                            {artigo.titulo}
                        </Typography>
                        <Image id="imagecentral" data={artigo.tumbnail.responsiveImage}/>
                        <Typography variant="h2" align="center" color="text.secondary" paragraph
                        sx={{marginTop: '2%'}}>
                            {artigo.tumbnail.responsiveImage.title}
                        </Typography>
                    </Container>
                </Box>

                <Container maxWidth="lg" sx={{marginTop: '3%'}}>
                <Box>
                <Typography variant="p" align="center" color="text.secondary" paragraph>
                        {artigo.descricao}
                    </Typography>
                    </Box>
                    </Container>
                    </>
        ))}
        </ThemeProvider>

    );

}


export default Info;