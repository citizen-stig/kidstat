import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import kidstatReducer from './store.js'

let store = createStore(kidstatReducer);

import Kidstat from './components/kidstat.jsx';


ReactDOM.render(
    <Provider store={store}>
        <Kidstat/>
    </Provider>,
    document.querySelector('.main-container')
);
