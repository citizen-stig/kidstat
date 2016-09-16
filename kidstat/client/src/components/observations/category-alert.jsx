import ReactDOM from 'react-dom';
import {Alert} from 'react-bootstrap';


const CategoryAlert = ({category}) => {
    return <Alert
        tabIndex="0" bsStyle="success"
        ref={node => {
            ReactDOM.findDOMNode(node).focus()
        }}>
        This is <strong>{category}</strong>
    </Alert>
};

export default CategoryAlert
