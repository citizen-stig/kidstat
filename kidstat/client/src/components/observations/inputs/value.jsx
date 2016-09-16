import {
    Col,
    FormGroup,
    FormControl,
    ControlLabel,
} from 'react-bootstrap';

const getValidationStateName = (validationState) => {
    if(validationState){ return "success"} else { return "error"}
};


const ValueInput = ({value, onChange, isValid}) => {
    return <FormGroup validationState={getValidationStateName(isValid)}
                      controlId="valueControl" className="required">
        <Col componentClass={ControlLabel} xs={4}>Value</Col>
        <Col xs={8}>
            <FormControl value={value}
                         autoCorrect="off"
                         required={true}
                         pattern="[0-9.]*"
                         onChange={onChange}/>
            <FormControl.Feedback />
        </Col>
    </FormGroup>
};

export default ValueInput;


