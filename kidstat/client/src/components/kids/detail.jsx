var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Image = ReactBootstrap.Image;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var Actions = require('../../actions');
var AddObservation = require('../obsevations/add.jsx');

module.exports = React.createClass({
    propTypes: {
        kid: React.PropTypes.object.isRequired
    },
    deleteKid: function(){
        Actions.deleteKid(this.props.kid);
    },
    render: function () {
        return <Grid>
            <Row>
                <Col xs={12} md={2}>
                    <Image src="//placehold.it/120x120" circle={true}/>
                </Col>
                <Col xs={12} md={4}>
                    <h1>{this.props.kid.name}</h1>
                    <p>{this.props.kid.birthday}</p>
                </Col>
                <Col xs={12} md={6}>
                    <i className="fa fa-trash" 
                       onClick={this.deleteKid}/>
                    <p>Some other information</p>
                    <AddObservation kid={this.props.kid}/>
                </Col>
            </Row>
        </Grid>
    }
});