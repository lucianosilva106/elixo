import { createTheme, ThemeProvider, responsiveFontSizes  } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';


let theme = createTheme();
theme = responsiveFontSizes(theme);

function Quemsomos() {

  return (
    <ThemeProvider theme={theme}>
    <Box
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
        Visão e Valores
      </Typography>
        <Typography variant="h4" align="center" color="text.secondary" paragraph>
           <p> 
            O objetivo do projeto é promover uma mudança cultural dos indivíduos sobre a importância 
            do descarte sustentável do lixo eletrônico. </p>
           <p>
              O projeto é voltado para a pessoa física que não tem acesso às informações a respeito  de
              como deve ser o descarte de peças eletrônicas obsoletas, precisando de manutenção ou em desuso.</p>
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
      </ThemeProvider>
  
    );
  }
  
  export default Quemsomos;

