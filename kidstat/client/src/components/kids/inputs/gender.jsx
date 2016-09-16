import {
    Col,
    FormGroup,
    FormControl,
    ControlLabel,
} from 'react-bootstrap';


const GenderSelect = ({value, onChange}) => {
    return <FormGroup controlId="formControlsSelect" className="required">
        <Col componentClass={ControlLabel} xs={4}>Gender</Col>
        <Col xs={8}>
            <FormControl className="min-width-95p"
                         componentClass="select"
                         value={value}
                         onChange={onChange}>
                <option value="male">Boy</option>
                <option value="female">Girl</option>
            </FormControl>
        </Col>
    </FormGroup>
};

export default GenderSelect;