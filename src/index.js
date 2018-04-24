import React from 'react';
import ReactDOM from 'react-dom';
import './main/index.css';
import { App, projects } from './main';
import registerServiceWorker from './main/registerServiceWorker';

ReactDOM.render(<App projects={projects} />, document.getElementById('root'));
registerServiceWorker();
