import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core'
import {red, blue, green} from '@material-ui/core/colors'
import 'fontsource-roboto';

const prefersDarkMode = false

const theme = createMuiTheme({
  palette: {
    type: prefersDarkMode ? 'dark' : 'light',
    primary: {
      main: red[500]
    },
    secondary: {
      main: blue[500]
    },
    action: {
      main: green[500]

    },
    error: {
      main: red[200]
    }
  }
  
})

ReactDOM.render(
  <React.StrictMode>
      <MuiThemeProvider theme = {theme}>
        <App />  
      </MuiThemeProvider>    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
