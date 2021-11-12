import firebase from "../../firebaseConnection";
import { useEffect, useState } from 'react';
import React, { useMemo } from 'react';
import { FaStar } from "react-icons/fa";
import Rating from '@material-ui/core/Rating';
import StarIcon from '@material-ui/icons/Star';
import Box from '@material-ui/core/Box';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import { Fade, TextField, Typography } from "@material-ui/core";
import { orange, green, grey } from '@material-ui/core/colors';

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

const Star = ({ selected = false, StarClicked = (f) => f }) => (
  <FaStar color={selected ? "green" : "grey"} onClick={StarClicked} width="" />
);

const labels = {
  1: 'Ruim',
  2: 'Razoável',
  3: 'Bom',
  4: 'Ótimo',
};

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
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};


function Avaliacao() {


  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const [pergunta1, setPergunta1] = useState('');
  const [resposta1, setResposta1] = useState(0);
  const [resposta2, setResposta2] = useState(0);
  const [resposta3, setResposta3] = useState(0);
  const [resposta4, setResposta4] = useState(0);

  const [avaliacao, setAvaliacao] = useState('');
  const [datamensagem, setDatamensagem] = useState('');
  const [sugestao, setSugestao] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    function loadAvaliacao(id) {
      firebase.firestore().collection('avaliacoes').doc(id)
        .onSnapshot((doc) => {
          setPergunta1(doc.data().pergunta1);
          setResposta1(doc.data().resposta1);
          setResposta2(doc.data().resposta2);
          setResposta3(doc.data().resposta3);
          setResposta4(doc.data().resposta4);
        })
    }
    loadAvaliacao('0rF3cVgRBbFFQY5LSWD5');
    localStorage.getItem('aval', SeuAval);
  }, [])

  const [firstStar, setFirstStar] = useState(false);
  const [secondStar, setSecondStar] = useState(false);
  const [thirdStar, setThirdStar] = useState(false);
  const [fourtStar, setFourtStar] = useState(false);

  const [clickedStar, setShowError] = useState(false);
  const showError = (index) => {
    setShowError(index);
  };

  let qresp1 = resposta1;
  let qresp2 = resposta2
  let qresp3 = resposta3;
  let qresp4 = resposta4;
  let SeuAval = 0;

  function AvaliacaoInc(id) {

    if (fourtStar) {
      qresp4 += 1;
    } else {
      if (thirdStar) {
        qresp3 += 1;
      } else {
        if (secondStar) {
          qresp2 += 1;
        } else {
          if (firstStar) {
            qresp1 += 1;
          }
        }
      }
    }
    AvaliacaoAtu(id);
  }

  async function AvaliacaoAtu(id) {
    await firebase.firestore().collection('avaliacoes')
      .doc(id)
      .update({
        pergunta1: pergunta1,
        resposta1: qresp1,
        resposta2: qresp2,
        resposta3: qresp3,
        resposta4: qresp4
      })
      .then(() => {
        alert('RESPOSTA INCREMENTADA COM SUCESSO!')
        localStorage.setItem('aval', SeuAval);
        alert(sugestao)
        if (sugestao) {
          addSugestao()
        }
        setResposta1(0);
        setResposta2(0);
        setResposta3(0);
        setResposta4(0);
        setFirstStar(false);
        setSecondStar(false);
        setThirdStar(false);
        setFourtStar(false);
        atuAvaliacao('0rF3cVgRBbFFQY5LSWD5');
      })
      .catch((error) => {
        alert("Erro ao gravar alteração: " + error)
      })
  }

  async function addSugestao() {
    var dataAtual = '';
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    dataAtual = dia + '/' + mes + '/' + ano;
    await firebase.firestore().collection('mensagens')
      .add({
        avaliacao: SeuAval,
        datamensagem: dataAtual,
        email: email,
        mensagem: sugestao
      })
      .then(() => {
        alert('Mensagem registrada com sucesso!');
        setAvaliacao('');
        setDatamensagem('');
        setEmail('');
        setSugestao('');
      })
      .catch((error) => {
        console.log('ERRO: ' + error);
      })
  }

  function atuAvaliacao(id) {
    firebase.firestore().collection('avaliacoes').doc(id)
      .onSnapshot((doc) => {
        setPergunta1(doc.data().pergunta1);
        setResposta1(doc.data().resposta1);
        setResposta2(doc.data().resposta2);
        setResposta3(doc.data().resposta3);
        setResposta4(doc.data().resposta4);
      })
  }

  return (
    <div>
      <Rating
      sx={{marginTop: '5%',}}
        max={4}
        name="hover-feedback"
        value={value}
        precision={1}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
      <Star
        selected={firstStar}
        StarClicked={() => {
          if (firstStar) {
            setFirstStar(false);
          } else {
            setFirstStar(true);
            SeuAval = 1;
          }

          setSecondStar(false);
          setThirdStar(false);
          setFourtStar(false);
        }}
      />
      <Star
        selected={secondStar}
        StarClicked={() => {
          if (secondStar) {
            setSecondStar(false);
          } else {
            setSecondStar(true);
            SeuAval = 2;
          }
          setFirstStar(true);
          setThirdStar(false);
          setFourtStar(false);
        }}
      />
      <Star
        selected={thirdStar}
        StarClicked={() => {
          if (thirdStar) {
            setThirdStar(false);
          } else {
            setThirdStar(true);
            SeuAval = 3;
          }
          setFirstStar(true);
          setSecondStar(true);
          setFourtStar(false);
        }}
      />
      <Star
        selected={fourtStar}
        StarClicked={() => {
          if (fourtStar) {
            setFourtStar(false);
          } else {
            setFourtStar(true);
            SeuAval = 4;
          }
          setFirstStar(true);
          setSecondStar(true);
          setThirdStar(true);
        }}
      />
      {clickedStar ? <div>this star already clicked</div> : null}

      <h4>
        <p> Deixe seu comentário que entraremos em contato com você.</p>
      </h4>   
      <TextField
        fullWidth
        margin="normal"
        required
        autoComplete="email"
        type="email"
        size="small"
        id="outlined-required"
        label="E-mail"
        value={email} onChange={(e) => setEmail(e.target.value)} />
         <TextField
        fullWidth
        margin="normal"
        required
        type="text"
        size="small"
        id="outlined-required"
        label="Deixe a sua opinião"
        multiline
        value={sugestao} onChange={(e) => setSugestao(e.target.value)} />
      <button onClick={() => AvaliacaoInc('0rF3cVgRBbFFQY5LSWD5')}>Enviar</button>
      {/*<p>Avaliações: {resposta1} Ruim  /  {resposta2} Razoável  /  {resposta3} Bom  /  {resposta4} Otimo  /  Seu Voto foi {SeuAval}</p>*/}

    </div>
  );
}

export default Avaliacao;