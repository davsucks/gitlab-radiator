import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './main/index.css';
import { App, config } from './main';
import registerServiceWorker from './main/registerServiceWorker';

ReactDOM.render(<App projects={config.gitlab.projects}/>, document.getElementById('root'));
registerServiceWorker();
