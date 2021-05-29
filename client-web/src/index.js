import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'normalize.css';
import { GlobalStyles } from './global-styles';
import { configureStore } from './redux/config-store';
import App from './App';
import history from './history';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <BrowserRouter>
        <GlobalStyles />
        <App />
      </BrowserRouter>
    </Router>
  </Provider>,
  document.getElementById('root')
);
