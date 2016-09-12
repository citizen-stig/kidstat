import React from 'react';
import ReactDOM from 'react-dom';
import Kidstat from './components/kidstat.jsx';


var element = React.createElement(Kidstat, {});

ReactDOM.render(element, document.querySelector('.main-container'));
