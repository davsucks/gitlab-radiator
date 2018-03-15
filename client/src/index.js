import React from 'react';
import ReactDOM from 'react-dom';
import './main/index.css';
import App from './main/App';
import registerServiceWorker from './main/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
