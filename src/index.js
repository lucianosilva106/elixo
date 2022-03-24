import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createTheme } from '@material-ui/core/styles';
import { orange, green } from '@material-ui/core/colors';
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import * as serviceWorkerRegistration from './registerServiceWorker';
//import * as serviceWorkerRegistration from './serviceWorkerRegistration';


const client = new GraphQLClient({
  url: "https://graphql.datocms.com/preview",
  headers: {
    "Authorization": "Bearer 1f5a4ad9696598b206d91d7a0ef4f6",
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ClientContext.Provider value={client}>
    <App />
    </ClientContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.unregister();



