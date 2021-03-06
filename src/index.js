import React from 'react';
import ReactDOM from 'react-dom';

import App from '~/components/App';

import { Provider } from 'react-redux';
import configureStore from '~/store/configureStore';

const store = configureStore();

const root = document.createElement('div');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
);

document.body.appendChild(root);
