import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';


const theme = createTheme({
  status: {
    danger: green[500],
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

  


