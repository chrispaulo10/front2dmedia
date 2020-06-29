import React from 'react';
import ReactDOM from 'react-dom';
import Request from './pages/request';
import './css/main.css';  
import './css/font.css';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <Request />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
