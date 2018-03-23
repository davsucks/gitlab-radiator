import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './main/index.css';
import { Project, config } from './main';
import registerServiceWorker from './main/registerServiceWorker';

ReactDOM.render(<Project name={config.gitlab.projectName}
                     id={config.gitlab.projectId}/>, document.getElementById('root'));
registerServiceWorker();
