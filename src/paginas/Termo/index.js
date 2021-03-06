import firebase from '../../firebaseConnection';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { orange, green, grey } from '@material-ui/core/colors';
import { TextField, Button } from 'react-admin';


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

function Termo() {

  const openlogin = () => {
    window.location.href='./login';
  };

  const [termouso, setTermouso] = useState('');
  const [objeto, setObjeto] = useState('');

  useEffect(() => {
    async function loadTermo(id) {
      await firebase.firestore().collection('termos')
      .doc(id)
      .onSnapshot((doc) => {
         setTermouso(doc.data().termouso);
         setObjeto(doc.data().objeto);
      })
    }
    loadTermo("p1SYWXXCWYqixTI9DKKA")
  })

  return (
    <ThemeProvider theme={theme}>
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
              Termos de Uso e Privacidade
            </Typography>
            <Typography variant="h5" align="center" sx={{ color: 'textos.main' }} paragraph>
              Conhe??a nossos Termos de Uso e Privacidade. 
            </Typography>
          </Container>
        </Box>

        <Container component="main" sx={{textAlign: 'justify'}} maxWidth="lg">
        
        <Typography variant='p'> {termouso}</Typography><br/>

        <br/><Typography variant='h6'> 1. Do objeto </Typography><br/>
        <Typography variant='p'>A plataforma Re-User Lixo Eletr??nico, visa aproximar vendedores e compradores interessados em produtos eletr??nicos usados. 
A plataforma caracteriza-se pela presta????o do seguinte servi??o: Intermedia????o de compra e venda de produtos eletr??nicos usados.
</Typography><br/>

<br/><Typography variant='h6'>2. Da aceita????o</Typography><br/>
<Typography variant='p'>O presente Termo estabelece obriga????es contratadas de livre e espont??nea vontade, por tempo indeterminado, entre a plataforma e as pessoas f??sicas ou jur??dicas, usu??rias do site e do aplicativo.
Ao utilizar a plataforma o usu??rio aceita integralmente as presentes normas e compromete-se a observ??-las, sob o risco de aplica????o das penalidades cab??veis.
A aceita????o do presente instrumento ?? imprescind??vel para o acesso e para a utiliza????o de quaisquer servi??os fornecidos pela empresa. Caso n??o concorde com as disposi????es deste instrumento, o usu??rio n??o deve utiliz??-los.
</Typography><br/>

<br/><Typography variant='h6'>3. Do acesso dos usu??rios</Typography><br/>
<Typography variant='p'>Ser??o utilizadas todas as solu????es t??cnicas ?? disposi????o do respons??vel pela plataforma para permitir o acesso ao servi??o 24 (vinte e quatro) horas por dia, 7 (sete) dias por semana. No entanto, a navega????o na plataforma ou em alguma de suas p??ginas poder?? ser interrompida, limitada ou suspensa para atualiza????es, modifica????es ou qualquer a????o necess??ria ao seu bom funcionamento.</Typography><br/>

<br/><Typography variant='h6'>4. Do cadastro</Typography><br/>
<Typography variant='p'>O acesso ??s funcionalidades da plataforma exigir?? a realiza????o de um cadastro pr??vio e, a depender dos servi??os ou produtos escolhidos, o pagamento de determinado valor.
Ao se cadastrar o usu??rio dever?? informar dados completos, recentes e v??lidos, sendo de sua exclusiva responsabilidade manter referidos dados atualizados, bem como o usu??rio se compromete com a veracidade dos dados fornecidos.
O usu??rio se compromete a n??o informar seus dados cadastrais e/ou de acesso ?? plataforma a terceiros, responsabilizando-se integralmente pelo uso que deles seja feito.
Menores de 18 anos e aqueles que n??o possu??rem plena capacidade civil dever??o obter previamente o consentimento expresso de seus respons??veis legais para utiliza????o da plataforma e dos servi??os ou produtos, sendo de responsabilidade exclusiva dos mesmos o eventual acesso por menores de idade e por aqueles que n??o possuem plena capacidade civil sem a pr??via autoriza????o.
Mediante a realiza????o do cadastro o usu??rio declara e garante expressamente ser plenamente capaz, podendo exercer e usufruir livremente dos servi??os e produtos.
O usu??rio dever?? fornecer um endere??o de e-mail v??lido, atrav??s do qual o site realizar?? todas as comunica????es necess??rias.<br/>
Ap??s a confirma????o do cadastro, o usu??rio possuir?? um login e uma senha pessoal, a qual assegura ao usu??rio o acesso individual ?? mesma. Desta forma, compete ao usu??rio exclusivamente a manuten????o de referida senha de maneira confidencial e segura, evitando o acesso indevido ??s informa????es pessoais.
Toda e qualquer atividade realizada com o uso da senha ser?? de responsabilidade do usu??rio, que dever?? informar prontamente a plataforma em caso de uso indevido da respectiva senha.
N??o ser?? permitido ceder, vender, alugar ou transferir, de qualquer forma, a conta, que ?? pessoal e intransfer??vel.<br/>
Caber?? ao usu??rio assegurar que o seu equipamento seja compat??vel com as caracter??sticas t??cnicas que viabilize a utiliza????o da plataforma e dos servi??os ou produtos.
O usu??rio poder??, a qualquer tempo, requerer o cancelamento de seu cadastro junto ?? plataforma Re-User. O seu descadastramento ser?? realizado o mais rapidamente poss??vel.
O usu??rio, ao aceitar os Termos e Pol??tica de Privacidade, autoriza expressamente a plataforma a coletar, usar, armazenar, tratar, ceder ou utilizar as informa????es derivadas do uso dos servi??os, do site e quaisquer plataformas, incluindo todas as informa????es preenchidas pelo usu??rio quando realizar ou atualizar seu cadastro, al??m de outras expressamente descritas na Pol??tica de Privacidade que dever?? ser autorizada pelo usu??rio.
</Typography><br/>

<br/><Typography variant='h6'>5. Dos servi??os ou produtos</Typography><br/>
<Typography variant='p'> Na plataforma os servi??os ou produtos oferecidos est??o descritos e apresentados com o maior grau de exatid??o, contendo informa????es sobre suas caracter??sticas, qualidades, quantidades, composi????o, pre??o, garantia, prazos de validade e origem, entre outros dados, bem como sobre os riscos que apresentam ?? sa??de e seguran??a do usu??rio.
Antes de finalizar a compra sobre determinado produto ou servi??o, o usu??rio dever?? se informar sobre as suas especifica????es e sobre a sua destina????o.
A entrega de servi??os ou produtos adquiridos na plataforma ser?? informada no momento da finaliza????o da compra.
</Typography><br/>

<br/><Typography variant='h6'>6. Dos pre??os</Typography><br/>
<Typography variant='p'>A plataforma se reserva no direito de reajustar unilateralmente, a qualquer tempo, os valores dos servi??os ou produtos sem consulta ou anu??ncia pr??via do usu??rio.
Os valores aplicados s??o aqueles que est??o em vigor no momento do pedido.
Os pre??os s??o indicados em reais e n??o incluem as taxas de entrega, as quais s??o especificadas ?? parte e s??o informadas ao usu??rio antes da finaliza????o do pedido.
Na contrata????o de determinado servi??o ou produto, a plataforma poder?? solicitar as informa????es financeiras do usu??rio, como CPF, endere??o de cobran??a e dados de cart??es. Ao inserir referidos dados o usu??rio concorda que sejam cobrados, de acordo com a forma de pagamento que venha a ser escolhida, os pre??os ent??o vigentes e informados quando da contrata????o. Referidos dados financeiros poder??o ser armazenados para facilitar acessos e contrata????es futuras.
</Typography><br/>

<br/><Typography variant='h6'>7. Do cancelamento</Typography><br/>
<Typography variant='p'>O usu??rio poder?? cancelar a compra em at?? 7 (sete) dias ap??s a contrata????o, mediante contato via e-mail: atendimento@re-user.com.br, de acordo com o C??digo de Defesa do Consumidor (Lei no. 8.078/90).</Typography><br/><br/>

<Typography variant='p'>
O servi??o poder?? ser cancelado por:<br/><br/>
a) parte do usu??rio: nessas condi????es os servi??os somente cessar??o quando conclu??do o ciclo vigente ao tempo do cancelamento;<br/>
b) viola????o dos Termos de Uso: os servi??os ser??o cessados imediatamente.<br/>
</Typography><br/>

<br/><Typography variant='h6'>8. Da troca e devolu????o</Typography><br/>
<Typography variant='p'>
A pol??tica de troca e devolu????es da plataforma ?? regida conforme o C??digo de Defesa do Consumidor (Lei n?? 8.078/90).<br/><br/>
A troca e/ou devolu????o do produto poder?? ocorrer por:<br/><br/>
a) direito de arrependimento;<br/>
b) v??cio do produto.<br/><br/>
Em caso de arrependimento, o usu??rio poder?? devolver o produto em at?? 7 (sete) dias ap??s o seu recebimento, mediante contato atrav??s do e-mail atendimento@re-user.com.br, de acordo com o C??digo de Defesa do Consumidor (Lei n?? 8.078/90).
Em caso de v??cio do produto, dever?? ser verificado v??cios de qualidade ou quantidade que tornem o produto impr??prios ou inadequados ao consumo a que se destinam ou que lhes diminuam o valor. Ainda, poder??o ser trocados ou devolvidos os produtos ou servi??os que apresentam disparidade com as indica????es constantes na plataforma no momento da compra ou na embalagem, respeitando as varia????es decorrentes de sua natureza.
O usu??rio dever?? entrar em contato atrav??s do e-mail: atendimento@re-user.com.br, t??o logo constate o v??cio. Se, no prazo m??ximo de 30 (trinta) dias, n??o for poss??vel resolver o v??cio ou, independentemente deste prazo, a substitui????o das partes viciadas puder comprometer a qualidade ou caracter??sticas do produto ou servi??o, diminuir-lhe o valor ou se tratar de produto ou servi??o essencial, o usu??rio poder?? optar pela substitui????o do produto por outro da mesma esp??cie ou pela reexecu????o do servi??o, pela devolu????o das quantias pagas ou pelo abatimento proporcional do pre??o.
</Typography><br/>

<br/><Typography variant='h6'>9. Do suporte</Typography><br/>
<Typography variant='p'>Em caso de qualquer d??vida, sugest??o ou problema com a utiliza????o da plataforma, o usu??rio poder?? entrar em contato com o suporte, atrav??s do e-mail suporte@re-user.com.br.
O servi??o de atendimento ao usu??rio estar?? dispon??vel nos seguintes dias e hor??rios: XXXXXX</Typography><br/>

<br/><Typography variant='h6'>10. Das responsabilidades</Typography><br/>
<Typography variant='p'>?? de responsabilidade do usu??rio:<br/><br/>
a) garantir a idoneidade da origem dos equipamentos anunciados na plataforma;<br/>
b) defeitos ou v??cios t??cnicos originados no pr??prio sistema do usu??rio;<br/>
c) a correta utiliza????o da plataforma, dos servi??os ou produtos oferecidos, prezando pela boa conviv??ncia, pelo respeito e cordialidade entre os usu??rios;<br/>
d) pelo cumprimento e respeito ao conjunto de regras disposto nesse Termo de Condi????es Geral de Uso, na respectiva Pol??tica de Privacidade e na legisla????o nacional e internacional;<br/>
e) pela prote????o aos dados de acesso ?? sua conta/perfil (login e senha).<br/>
</Typography><br/>

<Typography variant='p'>?? de responsabilidade da plataforma Re-User:<br/><br/>
a) indicar as caracter??sticas do servi??o ou produto;<br/>
b) os defeitos e v??cios encontrados no servi??o ou produto oferecido desde que lhe tenha dado causa;<br/>
c) as informa????es que foram por ele divulgadas, sendo que os coment??rios ou informa????es divulgadas por usu??rios s??o de inteira responsabilidade dos pr??prios usu??rios;<br/>
d) os conte??dos ou atividades il??citas praticadas atrav??s da sua plataforma.<br/>
</Typography><br/>

<Typography variant='p'>
A plataforma n??o se responsabiliza por links externos contidos em seu sistema que possam redirecionar o usu??rio ?? ambiente externo a sua rede.
N??o poder??o ser inclu??dos links externos ou p??ginas que sirvam para fins comerciais ou publicit??rios ou quaisquer informa????es il??citas, violentas, pol??micas, pornogr??ficas, xenof??bicas, discriminat??rias ou ofensivas.
</Typography><br/>

<br/><Typography variant='h6'>11. Dos direitos autorais</Typography><br/>
<Typography variant='p'>O presente Termo de Uso concede aos usu??rios uma licen??a n??o exclusiva, n??o transfer??vel e n??o sublicenci??vel, para acessar e fazer uso da plataforma e dos servi??os e produtos por ela disponibilizados.
A estrutura do site ou aplicativo, as marcas, logotipos, nomes comerciais, layouts, gr??ficos e design de interface, imagens, ilustra????es, fotografias, apresenta????es, v??deos, conte??dos escritos e de som e ??udio, programas de computador, banco de dados, arquivos de transmiss??o e quaisquer outras informa????es e direitos de propriedade intelectual da raz??o social Re-User Equipamentos Eletr??nicos e de Inform??tica Ltda. observados os termos da Lei da Propriedade Industrial (Lei n?? 9.279/96), Lei de Direitos Autorais (Lei n?? 9.610/98) e Lei do Software (Lei n?? 9.609/98), est??o devidamente reservados.
Este Termos de Uso n??o cede ou transfere ao usu??rio qualquer direito, de modo que o acesso n??o gera qualquer direito de propriedade intelectual ao usu??rio, exceto pela licen??a limitada ora concedida.
O uso da plataforma pelo usu??rio ?? pessoal, individual e intransfer??vel, sendo vedado qualquer uso n??o autorizado, comercial ou n??o-comercial. Tais usos consistir??o em viola????o dos direitos de propriedade intelectual da raz??o social Re-User Equipamentos Eletr??nicos e de Inform??tica Ltda., pun??veis nos termos da legisla????o aplic??vel.
</Typography><br/>

<br/><Typography variant='h6'>12. Das san????es</Typography><br/>
<Typography variant='p'>Sem preju??zo das demais medidas legais cab??veis, a raz??o social Re-User Equipamentos Eletr??nicos e de Inform??tica Ltda. poder??, a qualquer momento, advertir, suspender ou cancelar a conta do usu??rio:<br/><br/>

a) que violar qualquer dispositivo do presente Termo;<br/>
b) que descumprir os seus deveres de usu??rio;<br/>
c) que tiver qualquer comportamento fraudulento, doloso ou que ofenda a terceiros.<br/>
</Typography><br/>


<br/><Typography variant='h6'>13. Da rescis??o</Typography><br/>
<Typography variant='p'>A n??o observ??ncia das obriga????es pactuadas neste Termo de Uso ou da legisla????o aplic??vel poder??, sem pr??vio aviso, ensejar a imediata rescis??o unilateral por parte da raz??o social Re-User Equipamentos Eletr??nicos e de Inform??tica Ltda. e o bloqueio de todos os servi??os prestados ao usu??rio.</Typography><br/>

<br/><Typography variant='h6'>14. Das altera????es</Typography><br/>
<Typography variant='p'>Os itens descritos no presente instrumento poder??o sofrer altera????es, unilateralmente e a qualquer tempo, por parte da Re-User Equipamentos Eletr??nicos e de Inform??tica Ltda., para adequar ou modificar os servi??os, bem como para atender novas exig??ncias legais. As altera????es ser??o veiculadas pelo site www.re-user.netlify.app ou pelo aplicativo Re-User e o usu??rio poder?? optar por aceitar o novo conte??do ou por cancelar o uso dos servi??os, caso seja assinante de algum servi??o.</Typography><br/>

<Typography variant='p'>Os servi??os oferecidos podem, a qualquer tempo e unilateralmente, e sem qualquer aviso pr??vio, ser deixados de fornecer, alterados em suas caracter??sticas, bem como restringido para o uso ou acesso.</Typography><br/>

<br/><Typography variant='h6'>15. Da pol??tica de privacidade</Typography><br/>
<Typography variant='p'>Al??m do presente Termo, o usu??rio dever?? consentir com as disposi????es contidas na respectiva Pol??tica de Privacidade a ser apresentada a todos os interessados dentro da interface da plataforma.</Typography><br/>

<br/><Typography variant='h6'>16. Do foro</Typography><br/>
<Typography variant='p'>Para a solu????o de controv??rsias decorrentes do presente instrumento ser?? aplicado integralmente o Direito brasileiro.
Os eventuais lit??gios dever??o ser apresentados no foro da comarca em que se encontra a sede da empresa.
</Typography><br/>

      </Container>

    </ThemeProvider>
  )
}

export default Termo;