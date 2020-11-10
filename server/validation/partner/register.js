const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validatePartnerRegisterInput(data) {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.street = !isEmpty(data.street) ? data.street : "";
    data.city = !isEmpty(data.city) ? data.city : "";
    data.state = !isEmpty(data.state) ? data.state : "";
    data.zip = !isEmpty(data.zip) ? data.zip : "";
    data.country = !isEmpty(data.country) ? data.country : "";
    data.company = !isEmpty(data.company) ? data.company : "";


    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "FirstName field is required";
    } else {
        if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
            errors.firstName = "First Name must be at least 2 characters";
        }
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "LastName field is required";
    } else {
        if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
            errors.lastName = "Last Name must be at least 2 characters";
        }
    }


    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else {
        if (!Validator.isEmail(data.email)) {
            errors.email = "Email is invalid";
        }
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    } else {
        if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
            errors.password = "Password must be at least 6 characters";
        }
    }

    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Phone field is required";
    } else {
        if (!Validator.isLength(data.phone, { min: 10, max: 10 })) {
            errors.phone = "Phone must be at least 10 characters";
        }
    }

    if (Validator.isEmpty(data.street)) {
        errors.street = "Street field is required";
    } else {
        if (!Validator.isLength(data.street, { min: 2, max: 30 })) {
            errors.street = "Street must be at least 2 characters";
        }
    }

    if (Validator.isEmpty(data.city)) {
        errors.city = "City field is required";
    } else {
        if (!Validator.isLength(data.city, { min: 2, max: 30 })) {
            errors.city = "City must be at least 2 characters";
        }
    }

    if (Validator.isEmpty(data.state)) {
        errors.state = "State field is required";
    } else {
        if (!Validator.isLength(data.state, { min: 2, max: 30 })) {
            errors.state = "State must be at least 2 characters";
        }
    }

    if (Validator.isEmpty(data.zip)) {
        errors.zip = "Zip field is required";
    } else {
        if (!Validator.isLength(data.zip, { min: 2, max: 30 })) {
            errors.zip = "Zip must be at least 2 characters";
        }
    }

    if (Validator.isEmpty(data.country)) {
        errors.country = "Country field is required";
    } else {
        if (!Validator.isLength(data.country, { min: 2, max: 30 })) {
            errors.country = "Country must be at least 2 characters";
        }
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = "Company field is required";
    } else {
        if (!Validator.isLength(data.company, { min: 2, max: 30 })) {
            errors.company = "Company must be at least 2 characters";
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
