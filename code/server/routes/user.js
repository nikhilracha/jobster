var bcrypt = require('bcrypt');
var dbConn = require('../config/db.config');
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");

exports.register = async function (req, res) {
    const password = req.body.password;
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    console.log("in body", req.body);
    const encryptedPassword = await bcrypt.hash(password, 10) //how many rounds that our password needs to be hashed
    var users = {
        "u_firstname": req.body.firstName,
        "u_lastname": req.body.lastName,
        "u_email": req.body.email,
        "u_pass": encryptedPassword,
        "u_phone": req.body.phone,
        "u_dob": req.body.dob,
        "u_street": req.body.street,
        "u_city": req.body.city,
        "u_state": req.body.state,
        "u_zip": req.body.zip,
        "u_country": req.body.country,
        "u_substatus": req.body.substatus,
        "created_at": new Date()
    }
    dbConn.query("SELECT * FROM USER WHERE u_email = ?", [req.body.email], async function (error, results, fields) {
        if (error) {
            errors.email = "Unable to register, Please try again!";
            return res.status(400).json(errors);
        } else {
            if (results.length > 0) {
                errors.email = "User already registered";
                return res.status(400).json(errors);
            }
            else {
                dbConn.query('INSERT INTO USER SET ?', users, function (error, results, fields) {
                    if (error) {
                        console.log("wsd", error)
                        errors.email = "Unable to register, Please try again!";
                        return res.status(400).json(errors);
                    } else {
                        res.json({
                            status: true,
                            message: "User Registered Successfully"
                        });
                    }
                });
            }
        }
    }
    );
}



exports.login = async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    console.log("in body", req.body);
    dbConn.query("SELECT * FROM USER WHERE u_email = ?", [email], async function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            if (results.length > 0) {

                bcrypt.compare(password, results[0].u_pass).then(isMatch => {
                    if (isMatch) {
                        //user matched
                        const payload = {
                            id: results[0].u_ID,
                            name: results[0].u_lastname,
                            email: results[0].u_email,
                        };

                        //Sign the token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    tkn_type: "user",
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );

                    } else {
                        errors.password = "Incorrect Password ";
                        return res.status(400).json(errors);
                    }
                });

            }
            else {
                errors.email = "Email not found";
                return res.status(404).json(errors);
            }
        }
    });
}