import {Alert} from 'react-bootstrap'


const ErrorAlert = ({message}) => {
    return <Alert bsStyle="danger">{message}</Alert>
};

const ErrorsList = ({messages}) => {
    return <div>{messages.map(function (message, i) {
        return <ErrorAlert key={i} message={message}/>
    })}
    </div>
};

export default ErrorsList;