import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
registerServiceWorker();
