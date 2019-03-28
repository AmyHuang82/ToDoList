import React from 'react';
import ReactDOM from 'react-dom';

// import component
import ToDo from './ToDo';

window.addEventListener('load', () => {
    ReactDOM.render(<ToDo />, document.getElementById('root'));
});