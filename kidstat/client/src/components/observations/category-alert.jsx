import {Component} from 'react';
import ReactDOM from 'react-dom';
import {Alert} from 'react-bootstrap';


export default class CategoryAlert extends Component {
    // TODO: Add focus after component did mount
    render() {
        return <Alert tabIndex="0" bsStyle="success">
            This is <strong>{this.props.category}</strong>
        </Alert>
    }
}
