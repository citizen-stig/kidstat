import {Alert} from 'react-bootstrap';


const CategoryAlert = ({category}) => {
    return <Alert
        tabIndex="0" bsStyle="success">This is <strong>{category}</strong>
    </Alert>
};

export default CategoryAlert
