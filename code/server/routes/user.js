var bcrypt = require('bcrypt');
var dbConn = require('../config/db.config');
const jwt = require("jsonwebtoken");
var cloudinary = require("cloudinary");
const keys = require("../config/keys");
const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");

cloudinary.config({
    cloud_name: "dxg3rmriu",
    api_key: "254527847862585",
    api_secret: "aX7bMgSqXjvrfz9KBv-TN0PMr90"
});


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
        "u_profstatus": req.body.u_profstatus,
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
                            fname: results[0].u_firstname,
                            lname: results[0].u_lastname,
                            email: results[0].u_email,
                            phone: results[0].u_phone,
                            dob: results[0].u_dob,
                            street: results[0].u_street,
                            city: results[0].u_city,
                            state: results[0].u_state,
                            zip: results[0].u_zip,
                            profstatus: results[0].u_profstatus
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

exports.tkn_update = async function (req, res) {
    var email = req.body.email;

    dbConn.query("SELECT * FROM USER WHERE u_email = ?", [email], async function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            if (results.length > 0) {
                //user matched
                const payload = {
                    id: results[0].u_ID,
                    fname: results[0].u_firstname,
                    lname: results[0].u_lastname,
                    email: results[0].u_email,
                    phone: results[0].u_phone,
                    dob: results[0].u_dob,
                    street: results[0].u_street,
                    city: results[0].u_city,
                    state: results[0].u_state,
                    zip: results[0].u_zip,
                    profstatus: results[0].u_profstatus
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

            }
        }
    });
}


exports.createProfile = async function (req, res) {

    const errors = {}

    dbConn.query("SELECT * FROM UserProfile WHERE u_ID = ?", [req.body.u_ID], async function (error, results, fields) {
        if (error) {
            errors.email = "Unable to register, Please try again!";
            return res.status(400).json(errors);
        } else {
            if (results.length > 0) {
                errors.email = "Profile already registered, try to modify it!";
                return res.status(400).json(errors);
            }
            else {

                let promise = new Promise(function (resolve, reject) {
                    // Some imaginary 2000 ms timeout simulating a db call
                    setTimeout(() => {
                        if (req.files.u_profpic) {
                            cloudinary.uploader.upload(req.files.u_profpic[0].path, function (result) {
                                resolve({ prof_url: result.url });
                            })
                        } else {
                            // If promise can not be fulfilled due to some errors like network failure
                            // reject(new Error({ msg: 'It does not work' }));
                            resolve({ prof_url: "" });
                        }
                    }, 2000);
                });

                let promise2 = new Promise(function (resolve, reject) {
                    // Some imaginary 2000 ms timeout simulating a db call
                    setTimeout(() => {
                        if (req.files.u_resume) {
                            cloudinary.uploader.upload(req.files.u_resume[0].path, function (result) {
                                resolve({ u_resume: result.url });
                            })
                        } else {
                            // If promise can not be fulfilled due to some errors like network failure
                            // reject(new Error({ msg: 'It does not work' }));
                            resolve({ u_resume: "" });
                        }
                    }, 2000);
                });

                Promise.all([promise, promise2]).then((url) => {
                    console.log("result", url)
                    console.log("Request", req);
                    var profile = {
                        "u_ID": req.body.u_ID,
                        "u_profpic": url[0].prof_url,
                        "u_resume": url[1].resume_url,
                        "u_ug": req.body.u_undergrad,
                        "u_ug_gpa": req.body.u_undergrad_gpa,
                        "u_grad": req.body.u_grad,
                        "u_grad_gpa": req.body.u_grad_gpa,
                        "u_major": req.body.u_major,
                        "u_conc": req.body.u_concentration,
                    }
                    // console.log("Payload", profile)
                    // res.json({ msg: "ok" })

                    dbConn.query('INSERT INTO UserProfile SET ?', profile, function (error, results, fields) {
                        if (error) {
                            errors.email = "Unable to register, Please try again!";
                            return res.status(400).json(errors);
                        } else {
                            dbConn.query(`UPDATE USER SET u_profstatus=1 where u_ID=${req.body.u_ID}`, function (error, results, fields) {
                                if (error) {
                                    errors.email = "Unable to update, Please try again!";
                                    return res.status(400).json(errors);
                                } else {
                                    res.json({
                                        status: true,
                                        message: "Profile Registered Successfully"
                                    });
                                }
                            });
                        }

                    });


                });
            }
        }
    }
    );
}