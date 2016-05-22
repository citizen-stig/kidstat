var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');
var LoginWindow = require('./login-window');
var AuthStore = require('../stores/auth-store');
var Actions = require('../actions');


var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

var NavItem = ReactBootstrap.NavItem;

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(AuthStore, "handleAuthAction")
    ],
    handleAuthAction: function(event){
        if (event == 'authenticated'){ this.setState({authenticated: true}); }
        else if (event == 'logout') { this.setState({authenticated: false}); }
    },
    getInitialState: function () {
        return {authenticated: false}
    },
    openLogin: function () {
        console.log("Open login window");
        console.log(this.refs);
        this.refs.login_window.open();
    },
    render: function () {
        var nav;
        if (this.state.authenticated) {
            nav = (
                <Nav pullRight>
                    <NavItem eventKey={3} onClick={Actions.Logout} href="#">Logout</NavItem>
                </Nav>
            )

        } else {
            nav = (
                <Nav pullRight>
                    <NavItem eventKey={1} onClick={this.openLogin} href="#">Login</NavItem>
                    <NavItem eventKey={3} href="#">Register</NavItem>
                </Nav>
            );
        }
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Kidstat</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    {nav}
                </Navbar>
                <LoginWindow ref="login_window"/>
            </div>
        )
    }

});