import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'react-router-redux';
import './css/index.css';

import App from './App';
import store, { history } from './redux/store';
import theme from './theme';
import { unregister } from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
unregister();