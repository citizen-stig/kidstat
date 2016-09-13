import {FormControl} from 'react-bootstrap';


export default class Input extends FormControl {
    constructor(){
        super();

        this.onChange = this.onChange.bind(this);
    }
    onChange(event){
        console.log('LaLaLa from import');
        console.log(event);
        console.log(this.state)
    }
}