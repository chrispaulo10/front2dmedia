import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/Index';
import * as serviceWorker from './serviceWorker';
import './css/main.css';  
import './css/font.css';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <Index />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
