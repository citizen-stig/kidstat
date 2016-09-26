import React from 'react';
import ReactDOM from 'react-dom';
import {Alert} from 'react-bootstrap';


const CategoryAlert = ({category}) => {
    return <Alert
        ref={(input) => { if (input != null){ReactDOM.findDOMNode(input).focus();}}}
        tabIndex="0" bsStyle="success">This is <strong>{category}</strong>
    </Alert>
};

export default CategoryAlert
