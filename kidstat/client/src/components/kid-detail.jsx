var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Image = ReactBootstrap.Image;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

module.exports = React.createClass({
    propTypes: {
        kid: React.PropTypes.object.isRequired
    },
    render: function () {
        return <Grid>
            <Row>
                <Col xs={12} md={2}>
                    <Image src="//placehold.it/120x120" circle/>
                </Col>
                <Col xs={12} md={4}>
                    <h1>{this.props.kid.name}</h1>
                    <p>{this.props.kid.birthday}</p>
                </Col>
                <Col xs={12} md={6}>
                    <p>Some other information</p>
                </Col>
            </Row>
        </Grid>
    }
});