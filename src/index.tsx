import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import AuthService from './services/authService';
AuthService.login('user2', '1234');

ReactDOM.render(<App />, document.getElementById('root'));
