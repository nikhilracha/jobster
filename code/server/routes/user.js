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
        "u_profstatus": req.body.profstatus,
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
    console.log("body", req.body)
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
                            resolve({ prof_url: null });
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
                            resolve({ u_resume: null });
                        }
                    }, 2000);
                });

                Promise.all([promise, promise2]).then((url) => {
                    console.log("result", url)
                    var profile = {
                        "u_ID": req.body.u_ID,
                        "u_profpic": url[0].prof_url,
                        "u_resume": url[1].u_resume,
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


exports.modifyUserProfile = async function (req, res) {
    const errors = {}
    console.log("From body", req.body);
    let id = req.body.u_ID;
    let u_firstname = req.body.u_firstname;
    let u_lastname = req.body.u_lastname;
    let u_email = req.body.u_email;
    let u_phone = req.body.u_phone;
    let u_street = req.body.u_street;
    let u_city = req.body.u_city;
    let u_state = req.body.u_state;
    let u_zip = req.body.u_zip;
    dbConn.query(`update USER SET u_firstname = '${u_firstname}', u_lastname = '${u_lastname}', u_email = '${u_email}', u_phone = '${u_phone}', u_street = '${u_street}', u_city = '${u_city}', u_state = '${u_state}', u_zip = ${u_zip} where u_ID = ${id} `, function (error, results, fields) {
        if (error) {
            console.log(error)
            errors.email = "Unable to update profile, Please try again!";
            return res.status(400).json(errors);
        } else {

            console.log("rrr", results)

            if (results.affectedRows > 0) {

                res.json({
                    success: true,
                });
            }
        }
    });
}

exports.modifyUserEducationProfile = async function (req, res) {
    const errors = {}
    console.log("From body", req.body);
    let id = req.body.u_ID;
    let u_ug = req.body.u_ug;
    let u_ug_gpa = req.body.u_ug_gpa;
    let u_grad = req.body.u_grad;
    let u_grad_gpa = req.body.u_grad_gpa;
    let u_major = req.body.u_major;
    let u_conc = req.body.u_conc;
    dbConn.query(`update UserProfile SET u_ug = '${u_ug}', u_ug_gpa = '${u_ug_gpa}', u_grad = '${u_grad}', u_grad_gpa = '${u_grad_gpa}', u_major = '${u_major}', u_conc = '${u_conc}' where u_ID = ${id} `, function (error, results, fields) {
        if (error) {
            console.log(error)
            errors.email = "Unable to update education profile, Please try again!";
            return res.status(400).json(errors);
        } else {
            console.log("rrr", results)
            if (results.affectedRows > 0) {
                res.json({
                    success: true,
                });
            }
        }
    });
}

exports.modifyUserResume = async function (req, res) {
    const errors = {}
    console.log("From body", req.body);
    let id = req.body.u_ID;

    let promise = new Promise(function (resolve, reject) {
        // Some imaginary 2000 ms timeout simulating a db call
        setTimeout(() => {
            if (req.files.u_resume) {
                cloudinary.uploader.upload(req.files.u_resume[0].path, function (result) {
                    resolve({ u_resume: result.url });
                })
            } else {
                // If promise can not be fulfilled due to some errors like network failure
                // reject(new Error({ msg: 'It does not work' }));
                resolve({ u_resume: null });
            }
        }, 2000);
    });

    Promise.all([promise]).then((url) => {
        let link = url[0].u_resume;
        dbConn.query(`update UserProfile SET u_resume = '${link}' where u_ID = ${id} `, function (error, results, fields) {
            if (error) {
                console.log(error)
                errors.email = "Unable to update education profile, Please try again!";
                return res.status(400).json(errors);
            } else {
                console.log("rrr", results)
                if (results.affectedRows > 0) {
                    res.json({
                        success: true,
                    });
                }
            }
        });
    })
}


exports.getProfile = async function (req, res) {
    const errors = {};
    let id = req.params.id;
    console.log("get from body", id);

    dbConn.query(`select USER.u_firstname, USER.u_lastname, USER.u_email, USER.u_phone, USER.u_dob, USER.u_street, USER.u_city, USER.u_state, USER.u_zip, UserProfile.u_profpic, UserProfile.u_resume, UserProfile.u_ug, UserProfile.u_ug_gpa, UserProfile.u_grad, UserProfile.u_grad_gpa, UserProfile.u_major, UserProfile.u_conc from USER inner join UserProfile ON USER.u_ID = UserProfile.u_ID WHERE USER.u_ID = ${id}; `, function (error, results, fields) {
        if (error) {
            errors.email = "Unable to find profile, Please try again!";
            return res.status(400).json(errors);
        } else {

            if (results.length > 0) {

                //user matched
                const payload = {
                    u_firstname: results[0].u_firstname,
                    u_lastname: results[0].u_lastname,
                    u_email: results[0].u_email,
                    u_phone: results[0].u_phone,
                    u_dob: results[0].u_dob,
                    u_street: results[0].u_street,
                    u_city: results[0].u_city,
                    u_state: results[0].u_state,
                    u_zip: results[0].u_zip,
                    u_profpic: results[0].u_profpic,
                    u_resume: results[0].u_resume,
                    u_undergrad: results[0].u_ug,
                    u_undergrad_gpa: results[0].u_ug_gpa,
                    u_grad: results[0].u_grad,
                    u_grad_gpa: results[0].u_grad_gpa,
                    u_major: results[0].u_major,
                    u_concentration: results[0].u_conc,
                };
                res.json({
                    success: true,
                    payload: payload
                });
            }
        }
    });
}


exports.applyJob = async function (req, res) {
    const errors = {}
    console.log("From body", req.body);
    let uid = req.body.id;
    let jid = req.body.job;

    let application = {
        u_ID: uid,
        j_ID: jid
    }

    dbConn.query(`SELECT * FROM Application WHERE u_ID = ${uid} AND j_ID = ${jid} `, async function (error, results, fields) {
        if (error) {
            errors.email = "Unable to Apply, Please try again!";
            return res.status(400).json(errors);
        } else {
            if (results.length > 0) {
                errors.email = "User already Applied";
                return res.status(400).json(errors);
            }
            else {
                dbConn.query('INSERT INTO Application SET ?', application, function (error, results, fields) {
                    if (error) {
                        errors.email = "Unable to apply, Please try again!";
                        return res.status(400).json(errors);
                    } else {
                        res.json({
                            status: true,
                            message: "User Applied Successfully"
                        });
                    }
                });
            }
        }
    }
    );

    // dbConn.query(`update USER SET u_firstname = '${u_firstname}', u_lastname = '${u_lastname}', u_email = '${u_email}', u_phone = '${u_phone}', u_street = '${u_street}', u_city = '${u_city}', u_state = '${u_state}', u_zip = ${u_zip} where u_ID = ${id} `, function (error, results, fields) {
    //     if (error) {
    //         console.log(error)
    //         errors.email = "Unable to update profile, Please try again!";
    //         return res.status(400).json(errors);
    //     } else {

    //         console.log("rrr", results)

    //         if (results.affectedRows > 0) {

    //             res.json({
    //                 success: true,
    //             });
    //         }
    //     }
    // });
}
