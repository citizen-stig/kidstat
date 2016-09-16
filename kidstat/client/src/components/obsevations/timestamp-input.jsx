import {
    Col,
    FormGroup,
    FormControl,
    ControlLabel
} from 'react-bootstrap';


const TimestampInput = ({value, onChange}) => {
    return <FormGroup controlId="timestampControl" className="required">
        <Col componentClass={ControlLabel} xs={4}>Timestamp</Col>
        <Col xs={8}>
            <FormControl className="min-width-95p"
                         required={true}
                         value={value}
                         onChange={onChange}
                         type="date"/>
        </Col>
    </FormGroup>
};

export default TimestampInput