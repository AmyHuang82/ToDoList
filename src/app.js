import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
// import Route from 'react-router-dom/Route';

// import component
import ToDo from './ToDo';

window.addEventListener('load', () => {
    // let mycomponent = React.createElement(HelloWorld, null);
    ReactDOM.render(<ToDo />, document.getElementById('root'));
});