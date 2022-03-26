/// <reference path="typings/app.d.ts" />
/// <reference path="typings/action.d.ts" />
/// <reference path="typings/api.d.ts" />
/// <reference path="typings/state.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
