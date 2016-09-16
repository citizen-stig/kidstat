import {
    Col,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock
} from 'react-bootstrap';


const getValidationStateName = (validationState) => {
    if(validationState){ return "success"} else { return "error"}
};


const BirthdayInput = ({value, onChange, isValid}) => {
    return <FormGroup controlId="birthdayControl" className="required"
                      validationState={getValidationStateName(isValid)}>
        <Col componentClass={ControlLabel} xs={4}>
            Birthday
        </Col>
        <Col xs={8}>
            <FormControl className="min-width-95p"
                         required={true}
                         onChange={onChange}
                         value={value}
                         type="date"/>
            {!isValid ? <HelpBlock>Birthday should be less then a timestamp</HelpBlock> : ''}
        </Col>
    </FormGroup>
};

export default BirthdayInput;