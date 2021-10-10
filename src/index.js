import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, green } from '@material-ui/core/colors';
import { GraphQLClient, ClientContext } from 'graphql-hooks'

const client = new GraphQLClient({
  url: "https://graphql.datocms.com/preview",
  headers: {
    "Authorization": "Bearer 1f5a4ad9696598b206d91d7a0ef4f6",
  }
});

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ClientContext.Provider value={client}>
    <App />
    </ClientContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

  


