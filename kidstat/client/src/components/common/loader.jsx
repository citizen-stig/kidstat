import {Component} from 'react';


export default class Loader extends Component {

    constructor() {
        super();
        this.state = {active: false}
    }

    show() {
        this.setState({active: true})
    }

    hide() {
        this.setState({active: false})
    }

    render() {
        const spinnerStyle = {'fontSize': '20em'};
        return <div className={this.state.active ? '' : 'hidden'} id="loading">
            <i id="spinner" className="fa fa-refresh fa-spin"
               style={spinnerStyle}/>
            <span className="sr-only">Loading...</span>
        </div>
    }
}
