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
              Conheça nossos Termos de Uso e Privacidade. 
            </Typography>
          </Container>
        </Box>

        <Container component="main" sx={{textAlign: 'justify'}} maxWidth="lg">
        
        <Typography variant='p'> {termouso}</Typography><br/>

        <br/><Typography variant='h6'> 1. Do objeto </Typography><br/>
        <Typography variant='p'>A plataforma Re-User Lixo Eletrônico, visa aproximar vendedores e compradores interessados em produtos eletrônicos usados. 
A plataforma caracteriza-se pela prestação do seguinte serviço: Intermediação de compra e venda de produtos eletrônicos usados.
</Typography><br/>

<br/><Typography variant='h6'>2. Da aceitação</Typography><br/>
<Typography variant='p'>O presente Termo estabelece obrigações contratadas de livre e espontânea vontade, por tempo indeterminado, entre a plataforma e as pessoas físicas ou jurídicas, usuárias do site e do aplicativo.
Ao utilizar a plataforma o usuário aceita integralmente as presentes normas e compromete-se a observá-las, sob o risco de aplicação das penalidades cabíveis.
A aceitação do presente instrumento é imprescindível para o acesso e para a utilização de quaisquer serviços fornecidos pela empresa. Caso não concorde com as disposições deste instrumento, o usuário não deve utilizá-los.
</Typography><br/>

<br/><Typography variant='h6'>3. Do acesso dos usuários</Typography><br/>
<Typography variant='p'>Serão utilizadas todas as soluções técnicas à disposição do responsável pela plataforma para permitir o acesso ao serviço 24 (vinte e quatro) horas por dia, 7 (sete) dias por semana. No entanto, a navegação na plataforma ou em alguma de suas páginas poderá ser interrompida, limitada ou suspensa para atualizações, modificações ou qualquer ação necessária ao seu bom funcionamento.</Typography><br/>

<br/><Typography variant='h6'>4. Do cadastro</Typography><br/>
<Typography variant='p'>O acesso às funcionalidades da plataforma exigirá a realização de um cadastro prévio e, a depender dos serviços ou produtos escolhidos, o pagamento de determinado valor.
Ao se cadastrar o usuário deverá informar dados completos, recentes e válidos, sendo de sua exclusiva responsabilidade manter referidos dados atualizados, bem como o usuário se compromete com a veracidade dos dados fornecidos.
O usuário se compromete a não informar seus dados cadastrais e/ou de acesso à plataforma a terceiros, responsabilizando-se integralmente pelo uso que deles seja feito.
Menores de 18 anos e aqueles que não possuírem plena capacidade civil deverão obter previamente o consentimento expresso de seus responsáveis legais para utilização da plataforma e dos serviços ou produtos, sendo de responsabilidade exclusiva dos mesmos o eventual acesso por menores de idade e por aqueles que não possuem plena capacidade civil sem a prévia autorização.
Mediante a realização do cadastro o usuário declara e garante expressamente ser plenamente capaz, podendo exercer e usufruir livremente dos serviços e produtos.
O usuário deverá fornecer um endereço de e-mail válido, através do qual o site realizará todas as comunicações necessárias.<br/>
Após a confirmação do cadastro, o usuário possuirá um login e uma senha pessoal, a qual assegura ao usuário o acesso individual à mesma. Desta forma, compete ao usuário exclusivamente a manutenção de referida senha de maneira confidencial e segura, evitando o acesso indevido às informações pessoais.
Toda e qualquer atividade realizada com o uso da senha será de responsabilidade do usuário, que deverá informar prontamente a plataforma em caso de uso indevido da respectiva senha.
Não será permitido ceder, vender, alugar ou transferir, de qualquer forma, a conta, que é pessoal e intransferível.<br/>
Caberá ao usuário assegurar que o seu equipamento seja compatível com as características técnicas que viabilize a utilização da plataforma e dos serviços ou produtos.
O usuário poderá, a qualquer tempo, requerer o cancelamento de seu cadastro junto à plataforma Re-User. O seu descadastramento será realizado o mais rapidamente possível.
O usuário, ao aceitar os Termos e Política de Privacidade, autoriza expressamente a plataforma a coletar, usar, armazenar, tratar, ceder ou utilizar as informações derivadas do uso dos serviços, do site e quaisquer plataformas, incluindo todas as informações preenchidas pelo usuário quando realizar ou atualizar seu cadastro, além de outras expressamente descritas na Política de Privacidade que deverá ser autorizada pelo usuário.
</Typography><br/>

<br/><Typography variant='h6'>5. Dos serviços ou produtos</Typography><br/>
<Typography variant='p'> Na plataforma os serviços ou produtos oferecidos estão descritos e apresentados com o maior grau de exatidão, contendo informações sobre suas características, qualidades, quantidades, composição, preço, garantia, prazos de validade e origem, entre outros dados, bem como sobre os riscos que apresentam à saúde e segurança do usuário.
Antes de finalizar a compra sobre determinado produto ou serviço, o usuário deverá se informar sobre as suas especificações e sobre a sua destinação.
A entrega de serviços ou produtos adquiridos na plataforma será informada no momento da finalização da compra.
</Typography><br/>

<br/><Typography variant='h6'>6. Dos preços</Typography><br/>
<Typography variant='p'>A plataforma se reserva no direito de reajustar unilateralmente, a qualquer tempo, os valores dos serviços ou produtos sem consulta ou anuência prévia do usuário.
Os valores aplicados são aqueles que estão em vigor no momento do pedido.
Os preços são indicados em reais e não incluem as taxas de entrega, as quais são especificadas à parte e são informadas ao usuário antes da finalização do pedido.
Na contratação de determinado serviço ou produto, a plataforma poderá solicitar as informações financeiras do usuário, como CPF, endereço de cobrança e dados de cartões. Ao inserir referidos dados o usuário concorda que sejam cobrados, de acordo com a forma de pagamento que venha a ser escolhida, os preços então vigentes e informados quando da contratação. Referidos dados financeiros poderão ser armazenados para facilitar acessos e contratações futuras.
</Typography><br/>

<br/><Typography variant='h6'>7. Do cancelamento</Typography><br/>
<Typography variant='p'>O usuário poderá cancelar a compra em até 7 (sete) dias após a contratação, mediante contato via e-mail: atendimento@re-user.com.br, de acordo com o Código de Defesa do Consumidor (Lei no. 8.078/90).</Typography><br/><br/>

<Typography variant='p'>
O serviço poderá ser cancelado por:<br/><br/>
a) parte do usuário: nessas condições os serviços somente cessarão quando concluído o ciclo vigente ao tempo do cancelamento;<br/>
b) violação dos Termos de Uso: os serviços serão cessados imediatamente.<br/>
</Typography><br/>

<br/><Typography variant='h6'>8. Da troca e devolução</Typography><br/>
<Typography variant='p'>
A política de troca e devoluções da plataforma é regida conforme o Código de Defesa do Consumidor (Lei nº 8.078/90).<br/><br/>
A troca e/ou devolução do produto poderá ocorrer por:<br/><br/>
a) direito de arrependimento;<br/>
b) vício do produto.<br/><br/>
Em caso de arrependimento, o usuário poderá devolver o produto em até 7 (sete) dias após o seu recebimento, mediante contato através do e-mail atendimento@re-user.com.br, de acordo com o Código de Defesa do Consumidor (Lei nº 8.078/90).
Em caso de vício do produto, deverá ser verificado vícios de qualidade ou quantidade que tornem o produto impróprios ou inadequados ao consumo a que se destinam ou que lhes diminuam o valor. Ainda, poderão ser trocados ou devolvidos os produtos ou serviços que apresentam disparidade com as indicações constantes na plataforma no momento da compra ou na embalagem, respeitando as variações decorrentes de sua natureza.
O usuário deverá entrar em contato através do e-mail: atendimento@re-user.com.br, tão logo constate o vício. Se, no prazo máximo de 30 (trinta) dias, não for possível resolver o vício ou, independentemente deste prazo, a substituição das partes viciadas puder comprometer a qualidade ou características do produto ou serviço, diminuir-lhe o valor ou se tratar de produto ou serviço essencial, o usuário poderá optar pela substituição do produto por outro da mesma espécie ou pela reexecução do serviço, pela devolução das quantias pagas ou pelo abatimento proporcional do preço.
</Typography><br/>

<br/><Typography variant='h6'>9. Do suporte</Typography><br/>
<Typography variant='p'>Em caso de qualquer dúvida, sugestão ou problema com a utilização da plataforma, o usuário poderá entrar em contato com o suporte, através do e-mail suporte@re-user.com.br.
O serviço de atendimento ao usuário estará disponível nos seguintes dias e horários: XXXXXX</Typography><br/>

<br/><Typography variant='h6'>10. Das responsabilidades</Typography><br/>
<Typography variant='p'>É de responsabilidade do usuário:<br/><br/>
a) garantir a idoneidade da origem dos equipamentos anunciados na plataforma;<br/>
b) defeitos ou vícios técnicos originados no próprio sistema do usuário;<br/>
c) a correta utilização da plataforma, dos serviços ou produtos oferecidos, prezando pela boa convivência, pelo respeito e cordialidade entre os usuários;<br/>
d) pelo cumprimento e respeito ao conjunto de regras disposto nesse Termo de Condições Geral de Uso, na respectiva Política de Privacidade e na legislação nacional e internacional;<br/>
e) pela proteção aos dados de acesso à sua conta/perfil (login e senha).<br/>
</Typography><br/>

<Typography variant='p'>É de responsabilidade da plataforma Re-User:<br/><br/>
a) indicar as características do serviço ou produto;<br/>
b) os defeitos e vícios encontrados no serviço ou produto oferecido desde que lhe tenha dado causa;<br/>
c) as informações que foram por ele divulgadas, sendo que os comentários ou informações divulgadas por usuários são de inteira responsabilidade dos próprios usuários;<br/>
d) os conteúdos ou atividades ilícitas praticadas através da sua plataforma.<br/>
</Typography><br/>

<Typography variant='p'>
A plataforma não se responsabiliza por links externos contidos em seu sistema que possam redirecionar o usuário à ambiente externo a sua rede.
Não poderão ser incluídos links externos ou páginas que sirvam para fins comerciais ou publicitários ou quaisquer informações ilícitas, violentas, polêmicas, pornográficas, xenofóbicas, discriminatórias ou ofensivas.
</Typography><br/>

<br/><Typography variant='h6'>11. Dos direitos autorais</Typography><br/>
<Typography variant='p'>O presente Termo de Uso concede aos usuários uma licença não exclusiva, não transferível e não sublicenciável, para acessar e fazer uso da plataforma e dos serviços e produtos por ela disponibilizados.
A estrutura do site ou aplicativo, as marcas, logotipos, nomes comerciais, layouts, gráficos e design de interface, imagens, ilustrações, fotografias, apresentações, vídeos, conteúdos escritos e de som e áudio, programas de computador, banco de dados, arquivos de transmissão e quaisquer outras informações e direitos de propriedade intelectual da razão social Re-User Equipamentos Eletrônicos e de Informática Ltda. observados os termos da Lei da Propriedade Industrial (Lei nº 9.279/96), Lei de Direitos Autorais (Lei nº 9.610/98) e Lei do Software (Lei nº 9.609/98), estão devidamente reservados.
Este Termos de Uso não cede ou transfere ao usuário qualquer direito, de modo que o acesso não gera qualquer direito de propriedade intelectual ao usuário, exceto pela licença limitada ora concedida.
O uso da plataforma pelo usuário é pessoal, individual e intransferível, sendo vedado qualquer uso não autorizado, comercial ou não-comercial. Tais usos consistirão em violação dos direitos de propriedade intelectual da razão social Re-User Equipamentos Eletrônicos e de Informática Ltda., puníveis nos termos da legislação aplicável.
</Typography><br/>

<br/><Typography variant='h6'>12. Das sanções</Typography><br/>
<Typography variant='p'>Sem prejuízo das demais medidas legais cabíveis, a razão social Re-User Equipamentos Eletrônicos e de Informática Ltda. poderá, a qualquer momento, advertir, suspender ou cancelar a conta do usuário:<br/><br/>

a) que violar qualquer dispositivo do presente Termo;<br/>
b) que descumprir os seus deveres de usuário;<br/>
c) que tiver qualquer comportamento fraudulento, doloso ou que ofenda a terceiros.<br/>
</Typography><br/>


<br/><Typography variant='h6'>13. Da rescisão</Typography><br/>
<Typography variant='p'>A não observância das obrigações pactuadas neste Termo de Uso ou da legislação aplicável poderá, sem prévio aviso, ensejar a imediata rescisão unilateral por parte da razão social Re-User Equipamentos Eletrônicos e de Informática Ltda. e o bloqueio de todos os serviços prestados ao usuário.</Typography><br/>

<br/><Typography variant='h6'>14. Das alterações</Typography><br/>
<Typography variant='p'>Os itens descritos no presente instrumento poderão sofrer alterações, unilateralmente e a qualquer tempo, por parte da Re-User Equipamentos Eletrônicos e de Informática Ltda., para adequar ou modificar os serviços, bem como para atender novas exigências legais. As alterações serão veiculadas pelo site www.re-user.netlify.app ou pelo aplicativo Re-User e o usuário poderá optar por aceitar o novo conteúdo ou por cancelar o uso dos serviços, caso seja assinante de algum serviço.</Typography><br/>

<Typography variant='p'>Os serviços oferecidos podem, a qualquer tempo e unilateralmente, e sem qualquer aviso prévio, ser deixados de fornecer, alterados em suas características, bem como restringido para o uso ou acesso.</Typography><br/>

<br/><Typography variant='h6'>15. Da política de privacidade</Typography><br/>
<Typography variant='p'>Além do presente Termo, o usuário deverá consentir com as disposições contidas na respectiva Política de Privacidade a ser apresentada a todos os interessados dentro da interface da plataforma.</Typography><br/>

<br/><Typography variant='h6'>16. Do foro</Typography><br/>
<Typography variant='p'>Para a solução de controvérsias decorrentes do presente instrumento será aplicado integralmente o Direito brasileiro.
Os eventuais litígios deverão ser apresentados no foro da comarca em que se encontra a sede da empresa.
</Typography><br/>

      </Container>

    </ThemeProvider>
  )
}

export default Termo;