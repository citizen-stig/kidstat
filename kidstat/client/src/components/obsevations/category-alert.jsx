import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'


import {Alert} from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        category: state.sampleObservation.category
    }
};

class CategoryAlertContainer extends Component {
    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.alert).focus();
    }
    render() {
        return <Alert tabIndex="0" ref="alert" bsStyle="success">
            This is <strong>{this.props.category}</strong>
        </Alert>
    }
}


class CategoryAlert extends Component {
    render() {
        console.log('CategoryAlert.render()');
        console.log(this.props);
        return <div>
            {this.props.category ? <CategoryAlertContainer category={this.props.category}/> : ''}
        </div>
    }
}

CategoryAlert = connect(mapStateToProps, null)(CategoryAlert);
export default CategoryAlert