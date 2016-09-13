import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

import {Alert} from 'react-bootstrap';

export default class AlertCategory extends Component {
    componentDidMount() {
        var a = ReactDOM.findDOMNode(this.refs.alert);
        console.log(a);
        a.focus();
    }

    render() {
        return <Alert tabIndex="0" ref="alert" bsStyle="success">
            This is <strong>{this.props.category}</strong>
        </Alert>
    }
}