import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {
    Form,
    Col,
    FormGroup,
    FormControl,
    InputGroup,
    ControlLabel,
    Button,
    HelpBlock
} from 'react-bootstrap;'

import AuthStore from '../../stores/auth-store.jsx';
import Action from '../../actions.jsx';


export default class LoginForm extends Component {

    constructor() {
        super();
        this.state = {email: '', password: '', error: ''};
    }

    render(){
        return <p>hello</p>
    }

}