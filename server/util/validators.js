export function isNullOrEmpty(str) {
    if (str === undefined || str == "undefined") {
        return true;
    }
    if (str == null) {
        return true;
    }
    if (str == "") {
        return true;
    }
    if (str == "null") {
        return true;
    }
    return false;
}

export function isEmail(email) {
    const emailRegEx =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegEx)) return true;
    else return false;
}

export function validateLoginData(data) {
    let errors = {};
    if (isNullOrEmpty(data.email)) errors.email = "can not be empty";
    if (isNullOrEmpty(data.password)) errors.email = "can not be empty";
    return {
        errors,
        valid: Object.keys(errors).length === 0,
    };
}

export function validateRegisterData(data) {
    let errors = {};
    if (isNullOrEmpty(data.email)) {
        errors.email = "can not be empty";
    } else if (!isEmail(data.email)) {
        errors.email = "Must be valid email address";
    }
    if (isNullOrEmpty(data.firstName)) errors.firstName = "can not be empty";
    if (isNullOrEmpty(data.lastName)) errors.lastName = "can not be empty";
    if (isNullOrEmpty(data.password)) errors.password = "can not be empty";

    return {
        errors,
        valid: Object.keys(errors).length === 0,
    };
}
