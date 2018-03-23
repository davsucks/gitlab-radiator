import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './main/index.css';
import { App, config } from './main';
import registerServiceWorker from './main/registerServiceWorker';

ReactDOM.render(<App projectName={config.gitlab.projectName}
                     projectId={config.gitlab.projectId}/>, document.getElementById('root'));
registerServiceWorker();
