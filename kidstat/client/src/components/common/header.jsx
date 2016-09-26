import React from 'react';
import {Navbar} from 'react-bootstrap';

const Header = () => {
    return <Navbar className="hidden-xs">
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">KidStat</a>
                </Navbar.Brand>
            </Navbar.Header>
        </Navbar>
};

export default Header;