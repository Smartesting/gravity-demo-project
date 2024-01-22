import React from 'react';
import ReactDOM from 'react-dom/client';
import GravityCollector from '@smartesting/gravity-data-collector/dist';
import Config from './constants/Config';
import { ampli } from './ampli';

import store from './store';
import history from './history';
import Root from './components/Root';

import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Root, { store, history }));

const gravityConfig = {
  authKey: Config.GRAVITY_AUTH_KEY,
  recordRequestsFor: [window.location.origin],
};

if (Config.GRAVITY_SERVER_URL) {
  gravityConfig.gravityServerUrl = Config.GRAVITY_SERVER_URL;
}

if (Config.CI_ENV) {
  gravityConfig.requestInterval = 0;
}

GravityCollector.init(gravityConfig);

if (process.env.NODE_ENV === 'production') {
  ampli.load({ environment: 'default' });
}
