import firebase from '../../firebaseConnection';
import 'firebase/auth';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { TextField, Button, Stack } from "@material-ui/core";
import { orange, green, grey } from '@material-ui/core/colors';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Typography, Container, Avatar, Grid, Box } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { DateTimeInput } from 'react-admin';

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
      minimal: grey[500],
    },
    banner: {
      main: green[500],
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
  fontSize: '0.9rem',
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
theme.typography.data = {
  fontSize: '0.5rem',
  '@media (min-width:600px)': {
    fontSize: '0.6rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '0.8rem',
  },
};

function ChatPage(props) {

  var idprod = props.match.params.idp
  var idusu = props.match.params.idu

  const [idvendedor, setIdvendedor] = useState('');
  const [vendedornome, setVendedornome] = useState('');
  const [pathimagem, setPathimagem] = useState('');
  const [nomeproduto, setNomeproduto] = useState('');

  async function pegaProduto(idprod) {
    await firebase.firestore().collection('produtos')
      .doc(idprod)
      .get()
      .then((snapshot) => {
        setIdvendedor(snapshot.data().idusuario);
        setNomeproduto(snapshot.data().descricao);
        setVendedornome(snapshot.data().nomevendedor);
      })
  }

  pegaProduto(idprod)

  async function pegaImagem(idremetente) {
    await firebase.firestore().collection('usuarios')
      .doc(idremetente)
      .get()
      .then((snapshot) => {
        setPathimagem(snapshot.data().pathimagem);
      })
  }

  pegaImagem(idusu)

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function loadMessages() {
      await firebase.firestore().collection('chats').orderBy('datamsg')
        .onSnapshot((doc) => {
          let minhasMensagens = [];
          doc.forEach((item) => {
            if (item.data().idproduto === idprod) {
              minhasMensagens.push({
                id: item.id,
                mensagem: item.data().mensagem,
                nomevendedor: item.data().nomevendedor,
                remetente: item.data().remetente,
                pathimagem: item.data().pathimagem,
                datamsg: "12/05/2022"
              })
            }
          })

          setMessages(minhasMensagens);
        })
    }

    loadMessages();

  }, [idprod])

  const [formvalue, setFormvalue] = useState('');

  async function sendMessage() {
    await firebase.firestore().collection('chats')
      .add({
        idproduto: idprod,
        nomevendedor: vendedornome,
        remetente: localStorage.getItem('nomelogado'),
        datamsg: firebase.firestore.Timestamp.now(),
        pathimagem: pathimagem,
        mensagem: formvalue
      })
      .then(() => {
        setFormvalue('');
        alert('mensagem gravada com sucesso');
      });
  }


  return (

    <ThemeProvider theme={theme}>

      <>

      <Box
          sx={{
            bgcolor: '#e8f5e9',
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
              Chat - {nomeproduto}
            </Typography>
            <Typography variant="h5" align="center" sx={{ color: 'textos.main' }} paragraph>
              Tire suas dúvidas sobre a compra e venda desse produto. 
            </Typography>
          </Container>
        </Box>
        {messages.map((message) => {
          if (message.remetente === message.nomevendedor) {
            return (

              <Container maxWidth="md" sx={{marginTop: 2, }}>
                <Grid container spacing={0.5} sx={{ textAlign: 'center', alignItems: 'center', }}>
                <Grid item xs={8}>
                  <Box sx={{
                      bgcolor: '#e8f5e9',
                      pt: 2,
                      pb: 2,
                      textAlign: 'center',
                      borderRadius: 3
                    }}>
                    <Typography noWrap variant='p'>{message.mensagem}</Typography>
                  </Box>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: 'center', alignItems: 'center', maxWidth: '30%'}}>
                  <Stack direction="column" spacing={0.5}>
                    <Avatar sx={{ border: 2, borderColor: 'primary.main', alignSelf: 'center' }}
                      src={message.pathimagem} height="60" width="80" />
                      <Typography noWrap variant='data'>{message.datamsg}</Typography>
                    <Typography variant='p'>{message.remetente}</Typography>
                    </Stack>
                  </Grid>
                </Grid>

              </Container>
            )
          } else {
            return (
              <Container maxWidth="md" sx={{marginTop: 2}}>
                <Grid container spacing={0.5} sx={{ textAlign: 'center', alignItems: 'center', }}>
                <Grid item xs={4} sx={{ textAlign: 'center', alignItems: 'center', maxWidth: '30%'}}>
                  <Stack direction="column" spacing={0.5}>
                    <Avatar sx={{ border: 2, borderColor: 'primary.main', alignSelf: 'center', }}
                      src={message.pathimagem} height="60" width="80" />
                      <Typography noWrap variant='data'>{message.datamsg}</Typography>
                    <Typography noWrap variant='p'>{message.remetente}</Typography>     
                    </Stack>            
                  </Grid>
                  <Grid item xs={8}>
                    <Box sx={{
                      bgcolor: '#fafafa',
                      pt: 2,
                      pb: 2,
                      textAlign: 'center',
                      borderRadius: 3
                    }}>
                      <Typography variant='p'>{message.mensagem}</Typography>
                    </Box>
                  </Grid>
                </Grid>

              </Container>
            )
          }
        })
        }
                <Container maxWidth="md" sx={{marginTop: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                multiline
                fullWidth
                margin="normal"
                required
                size="small"
                id="descricao-form"
                label="Digite sua mensagem aqui"
                defaultValue="Mensagem_default"
                value={formvalue} onChange={(e) => setFormvalue(e.target.value)} />

            </Grid>
            <Grid item xs={4}>

              <Button variant='contained' color='primary' fullWidth
                disableElevation sx={{
                  color: 'white',
                  mt: 2,
                }} onClick={sendMessage} endIcon={<SendIcon />}>Enviar</Button>

            </Grid>
          </Grid>
        </Container>

      </>
    </ThemeProvider>
  )

}

export default ChatPage;