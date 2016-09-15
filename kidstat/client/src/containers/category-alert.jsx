import {connect} from 'react-redux'

import CategoryAlert from '../components/obsevations/category-alert.jsx';

let CategoryAlertContainer = ({category}) => {
    return <div>
        {category ? <CategoryAlert category={category}/> : ''}
    </div>
};

const mapStateToProps = (state) => {
    return {
        category: state.sampleObservation.category
    }
};


CategoryAlertContainer = connect(mapStateToProps, null)(CategoryAlertContainer);
export default CategoryAlertContainer

