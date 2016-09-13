var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');
var AuthStore = require('../../stores/auth-store.jsx');
var Actions = require('../../actions.jsx');

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
    render: function () {
        var nav;
        if (this.state.authenticated) {
            nav = <Nav pullRight>
                    <NavItem eventKey={3} 
                             onClick={Actions.Logout} href="#">
                        Logout
                    </NavItem>
                </Nav>
        }
        return <Navbar className={!this.state.authenticated ? "hidden-xs" : ""}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Kidstat</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    {nav}
                </Navbar>
    }
});