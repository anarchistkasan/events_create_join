import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import App from '~/components/App';

const root = document.createElement('div');

ReactDOM.render(
  <Fragment>
    <App />
  </Fragment>,
  root,
);

document.body.appendChild(root);
