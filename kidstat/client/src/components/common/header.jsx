import React from 'react';
import {Navbar} from 'react-bootstrap';

export default class Header extends React.Component {
    render() {
        return <Navbar className="hidden-xs">
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">KidStat</a>
                </Navbar.Brand>
            </Navbar.Header>
        </Navbar>
    }
};
