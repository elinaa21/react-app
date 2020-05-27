import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import authService from './services/authService';

authService.getAuthData();
authService.login('elina', 'igormenyanelubit');
ReactDOM.render(<App />, document.getElementById('root'));
