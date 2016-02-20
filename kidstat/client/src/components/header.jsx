var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var LoginWindow = require('./login-window');

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;

module.exports = React.createClass({
    openLogin: function(){
        console.log("Open login window")
        this.refs.login_window.open();
    },
    render: function () {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Kidstat</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} onClick={this.openLogin}
                                 href="#">Login</NavItem>
                    </Nav>
                </Navbar>
                <LoginWindow ref="login_window"/>
            </div>
        )
    }

});