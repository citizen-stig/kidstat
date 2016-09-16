import {connect} from 'react-redux'

import CategoryAlert from '../../../components/observations/category-alert.jsx';

let CategoryAlertContainer = ({category}) => {
    return <div>
        {category ? <CategoryAlert category={category}/> : ''}
    </div>
};

const mapStateToProps = (state) => {
    return {
        category: state.sampleObservation.data.category
    }
};


CategoryAlertContainer = connect(mapStateToProps, null)(CategoryAlertContainer);
export default CategoryAlertContainer
