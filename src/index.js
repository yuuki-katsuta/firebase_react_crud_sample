import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Container maxWidth='sm'>
      <Typography component='div' />
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
