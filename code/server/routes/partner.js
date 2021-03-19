var bcrypt = require('bcrypt');
var dbConn = require('../config/db.config');
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validatePartnerLoginInput = require("../validation/partner/login");
const validatePartnerRegisterInput = require("../validation/partner/register");

exports.register = async function (req, res) {
    const password = req.body.password;
    const { errors, isValid } = validatePartnerRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    console.log("in body", req.body);
    const encryptedPassword = await bcrypt.hash(password, 10) //how many rounds that our password needs to be hashed
    var partner = {
        "p_poc_firstname": req.body.firstName,
        "p_poc_lastname": req.body.lastName,
        "p_email": req.body.email,
        "p_pass": encryptedPassword,
        "p_poc_phone": req.body.phone,
        "p_street": req.body.street,
        "p_city": req.body.city,
        "p_state": req.body.state,
        "p_zip": req.body.zip,
        "p_country": req.body.country,
        "p_companyname": req.body.company,
        "p_company_logo": "",
        "created_at": new Date()
    }
    dbConn.query("SELECT * FROM PARTNER WHERE p_email = ?", [req.body.email], async function (error, results, fields) {
        if (error) {
            errors.email = "Unable to register, Please try again!";
            return res.status(400).json(errors);
        } else {
            if (results.length > 0) {
                errors.email = "User already registered";
                return res.status(400).json(errors);
            }
            else {
                dbConn.query('INSERT INTO PARTNER SET ?', partner, function (error, results, fields) {
                    if (error) {
                        console.log("wsd", error)
                        errors.email = "Unable to register, Please try again!";
                        return res.status(400).json({ error: errors });
                    } else {
                        res.json({
                            status: true,
                            message: "Partner Registered Successfully"
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
    const { errors, isValid } = validatePartnerLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    console.log("in body", req.body);
    dbConn.query("SELECT * FROM PARTNER WHERE p_email = ?", [email], async function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            if (results.length > 0) {

                bcrypt.compare(password, results[0].p_pass).then(isMatch => {
                    if (isMatch) {
                        //user matched
                        const payload = {
                            id: results[0].p_ID,
                            name: results[0].p_lastname,
                            email: results[0].p_email,
                        };

                        //Sign the token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    tkn_type: "partner",
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