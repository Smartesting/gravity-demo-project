import React from 'react';
import ReactDOM from 'react-dom/client';
import GravityCollector from '@smartesting/gravity-data-collector/dist';
import Config from './constants/Config';

import store from './store';
import history from './history';
import Root from './components/Root';

import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Root, { store, history }));

GravityCollector.init({
  authKey: Config.GRAVITY_AUTH_KEY,
});
