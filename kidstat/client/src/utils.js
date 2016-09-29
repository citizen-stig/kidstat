

export function genericErrorsHandler(type, json) {
    let errors;
    if ("message" in json) {
        errors = [json['message']];
    } else if ("errors" in json) {
        let jsonErrors = json['errors'];
        if (jsonErrors.constructor === Array) {
            errors = jsonErrors;
        } else if (typeof jsonErrors === 'object') {
            errors = [];
            for (let key in jsonErrors) {
                if (jsonErrors.hasOwnProperty(key)) {
                    let value = jsonErrors[key];
                    if (value.constructor === Array) {
                        for (let i = 0; i < value.length; i++) {
                            let error = key + ": " + value[i];
                            errors.push(error)
                        }
                    } else {
                        let error = key + ": " + value;
                        errors.push(error);
                    }
                }
            }
        } else {
            console.log('Unknown format, try it this way');
            errors = [jsonErrors];
        }
    } else {
        errors = ['Unknown Error'];
    }

    return {
        type: type,
        status: 'error',
        errors: errors
    }

}