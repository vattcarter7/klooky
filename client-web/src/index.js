import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'normalize.css';
import { GlobalStyles } from './global-styles';
import { configureStore } from './redux/config-store';
import ScrollToTop from './utils/scroll-to-top';
import App from './App';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyles />
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
