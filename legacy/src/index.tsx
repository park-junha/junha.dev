import React from 'react';
import ReactDOM from 'react-dom';

//  Import stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

//  Import components after CSS
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
