var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Image = ReactBootstrap.Image;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var Actions = require('../../actions');
var KidsStore = require('../../stores/kids-store.jsx');
var ObservationsStore = require('../../stores/observations-store.jsx');
var AddObservation = require('../obsevations/add.jsx');
var Modal = require('../common/modal.jsx');
var KidForm = require('./form.jsx');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(KidsStore, "handleKidActions"),
        Reflux.listenTo(ObservationsStore, "handleObservationActions")],
    propTypes: {
        kid: React.PropTypes.object.isRequired
    },

    getEmptyObservation: function(){
        return {value: "N/A"}
    },
    getInitialState: function () {
        return {
            weight: this.getEmptyObservation(),
            height: this.getEmptyObservation()
        }
    },
    componentWillMount: function () {
        Actions.getObservations(this.props.kid)
    },
    handleKidActions: function (event) {
        if (event === KidsStore.events.change) {
            this.refs.modal.close()
        }
    },
    handleObservationActions: function (event, observations) {
        console.log('Observation action handler in detail.jsx');
        console.log(event);
        if (event === 'change') {
            this.updateObservationsState(observations);
        }
    },
    getLastOrNotAvailable: function (values) {
        if (values.length > 0) {
            return values[values.length - 1]
        } else {
            return this.getEmptyObservation();
        }
    },
    updateObservationsState: function (observations) {
        console.log('Update observations state');
        console.log(observations);
        var kid_observations = observations[this.props.kid.id];
        var heights = [];
        var weights = [];
        for (var i = 0; i < kid_observations.length; i++) {
            var parameter = kid_observations[i]["parameter"].toLowerCase();
            if (parameter == "height") {
                heights.push(kid_observations[i])
            } else if (parameter == "weight") {
                weights.push(kid_observations[i])
            }
        }
        var height = this.getLastOrNotAvailable(heights);
        var weight = this.getLastOrNotAvailable(weights);
        console.log('New observations');
        console.log(height);
        console.log(weight);
        this.setState({weight: weight, height: height})
    },
    deleteKid: function () {
        Actions.deleteKid(this.props.kid);
    },
    age: function () {
        var now = new Date();
        return Math.round((now - this.props.kid.birthday) / (1000 * 60 * 60 * 24));
    },
    editKid: function (kid) {
        kid.id = this.props.kid.id;
        return Actions.updateKid(kid);
    },
    openModal: function () {
        this.refs.modal.open();
    },
    render: function () {
        return <Grid>
            <Row>
                <Col xs={6} md={2}>
                    <Image src="//placehold.it/120x120" circle={true}/>
                </Col>
                <Col xs={6} md={3}>
                    <h1>{this.props.kid.name}</h1>
                    <p>Age: {this.age()} days</p>
                </Col>
                <Col xs={12} md={4}>
                    <p>
                        <strong>Weight:</strong> {this.state.weight.value}(N/A)
                    </p>
                    <p>
                        <strong>Height:</strong> {this.state.height.value}(N/A)
                    </p>
                </Col>
                <Col xs={12} md={3}>
                    <div className="pull-right">
                        <a onClick={this.openModal} href="#">
                            <i className="fa fa-pencil"/>
                        </a>
                        <a onClick={this.deleteKid} href="#">
                            <i className="fa fa-trash"/>
                        </a>
                    </div>
                    <div className="clearfix"></div>
                    <AddObservation kid={this.props.kid}/>
                </Col>
            </Row>
            <Modal title="Edit Kid" ref="modal">
                <KidForm buttonText="Edit Kid Info"
                         kid={this.props.kid}
                         submitAction={this.editKid}/>
            </Modal>
        </Grid>
    }
});