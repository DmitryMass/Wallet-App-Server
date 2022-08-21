import React from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './Components/App';

import store from './Store/store';
import { Provider } from 'react-redux';

import './Styles/reset.css';
import './Styles/main.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.querySelector('#root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
