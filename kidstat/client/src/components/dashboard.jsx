import React, {Component, PropTypes} from 'react';
import {Row} from 'react-bootstrap'

import KidsList from './kids/list.jsx';
import AddKid from './kids/add.jsx';


export default class Dashboard extends Component {
    render() {
        return <Row>
            <KidsList/>
            <AddKid/>
        </Row>
    }
}