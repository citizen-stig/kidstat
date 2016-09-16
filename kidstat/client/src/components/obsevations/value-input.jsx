import {
    Col,
    FormGroup,
    FormControl,
    ControlLabel,
} from 'react-bootstrap';


const ValueInput = ({value, onChange, getValidationState}) => {
    return <FormGroup validationState={getValidationState}
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


