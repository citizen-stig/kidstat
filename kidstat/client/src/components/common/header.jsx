import {Component} from 'react';
import {Navbar} from 'react-bootstrap';

export default class Header extends Component {
    render() {
        return <Navbar className="hidden-xs">
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Kidstat</a>
                </Navbar.Brand>
            </Navbar.Header>
        </Navbar>
    }
}