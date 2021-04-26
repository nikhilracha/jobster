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
        "p_profstatus": 0,
        "p_ac_status": 0,
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
            console.log(error)
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
                            email: results[0].p_email,
                            fname: results[0].p_poc_firstname,
                            lname: results[0].p_poc_lastname,
                            phone: results[0].p_poc_phone,
                            street: results[0].p_street,
                            city: results[0].p_city,
                            state: results[0].p_state,
                            zip: results[0].p_zip,
                            companyname: results[0].p_companyname,
                            profstatus: results[0].p_profstatus,
                            acstatus: results[0].p_ac_status,
                            acplan: results[0].p_ac_plan_type,
                            acsubscribed: results[0].subscribed_at
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

exports.changePassword = async function (req, res) {
    var email = req.body.email;
    var old = req.body.current;
    var password = req.body.new;
    const encryptedPassword = await bcrypt.hash(password, 10)


    console.log("in body", req.body);
    dbConn.query("SELECT * FROM PARTNER WHERE p_email = ?", [email], async function (error, results, fields) {
        if (error) {
            console.log(error)
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            if (results.length > 0) {
                bcrypt.compare(old, results[0].p_pass).then(isMatch => {
                    if (isMatch) {
                        dbConn.query(`UPDATE PARTNER SET p_pass='${encryptedPassword}' where p_email='${email}'`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                return res.status(400).json({ current: "Unable to update, Please try again!" });
                            } else {
                                res.json({
                                    tkn_type: "partner",
                                    success: true,
                                    message: "Updated Password Successfully"
                                });
                            }
                        });
                    }
                    else {
                        return res.status(400).json({
                            current: "Password didn't match"
                        });
                    }
                })
            }
        }
    });
}



exports.tkn_update = async function (req, res) {
    console.log("body", req.body)
    var email = req.body.email;

    dbConn.query("SELECT * FROM PARTNER WHERE p_email = ?", [email], async function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            if (results.length > 0) {
                //user matched
                const payload = {
                    id: results[0].p_ID,
                    email: results[0].p_email,
                    fname: results[0].p_poc_firstname,
                    lname: results[0].p_poc_lastname,
                    phone: results[0].p_poc_phone,
                    street: results[0].p_street,
                    city: results[0].p_city,
                    state: results[0].p_state,
                    zip: results[0].p_zip,
                    companyname: results[0].p_companyname,
                    profstatus: results[0].p_profstatus,
                    acstatus: results[0].p_ac_status,
                    acplan: results[0].p_ac_plan_type,
                    acsubscribed: results[0].subscribed_at
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

            }
        }
    });
}

exports.createProfile = async function (req, res) {

    const errors = {}

    console.log("in body", req.body);

    var profile = {
        "p_ID": req.body.p_ID,
        "c_name": req.body.name,
        "c_logo": req.body.imgLink,
        "c_website": req.body.websiteLink,
        "c_industry": req.body.industry,
        "c_size": req.body.totalEmp,
        "c_headquarters": req.body.headquater,
        "c_info": req.body.info,
        "c_type": req.body.type,
        "c_revenue": req.body.revenue,
        "c_founded": req.body.foundedYear,
        "c_specialities": req.body.specialties,
    }
    dbConn.query("SELECT * FROM PartnerCompany WHERE p_ID = ?", [req.body.p_ID], async function (error, results, fields) {
        if (error) {
            console.log("err", error)
            errors.email = "Unable to register, Please try again!";
            return res.status(400).json(errors);
        } else {
            if (results.length > 0) {
                errors.email = "Partner Company Profile already registered";
                return res.status(400).json(errors);
            }
            else {
                dbConn.query('INSERT INTO PartnerCompany SET ?', profile, function (error, results, fields) {
                    if (error) {
                        console.log("err", error)
                        errors.email = "Unable to register, Please try again!";
                        return res.status(400).json(errors);
                    } else {
                        dbConn.query(`UPDATE PARTNER SET p_profstatus=1 where p_ID=${req.body.p_ID}`, function (error, results, fields) {
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
            }
        }
    }
    );
}

exports.modifyPartnerProfile = async function (req, res) {
    const errors = {}
    console.log("From body", req.body);
    let id = req.body.p_ID;
    let p_poc_firstname = req.body.p_poc_firstname;
    let p_poc_lastname = req.body.p_poc_lastname;
    let p_email = req.body.p_email;
    let p_poc_phone = req.body.p_poc_phone;
    let p_street = req.body.p_street;
    let p_city = req.body.p_city;
    let p_state = req.body.p_state;
    let p_zip = req.body.p_zip;
    dbConn.query(`update PARTNER SET p_poc_firstname = '${p_poc_firstname}', p_poc_lastname = '${p_poc_lastname}', p_email = '${p_email}', p_poc_phone = '${p_poc_phone}', p_street = '${p_street}', p_city = '${p_city}', p_state = '${p_state}', p_zip = ${p_zip} where p_ID = ${id} `, function (error, results, fields) {
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

exports.modifyPartnerCompanyProfile = async function (req, res) {
    const errors = {}
    console.log("From body", req.body);
    let id = req.body.p_ID;
    let c_name = req.body.c_name;
    let c_logo = req.body.c_logo;
    let c_website = req.body.c_website;
    let c_industry = req.body.c_industry;
    let c_size = req.body.c_size;
    let c_headquarters = req.body.c_headquarters;
    let c_revenue = req.body.c_revenue;
    let c_founded = req.body.c_founded;
    let c_specialities = req.body.c_specialities;
    dbConn.query(`update PartnerCompany SET c_name = '${c_name}', c_logo = '${c_logo}', c_website = '${c_website}', c_industry = '${c_industry}', c_size = '${c_size}', c_headquarters = '${c_headquarters}', c_revenue = '${c_revenue}', c_founded = ${c_founded}, c_specialities = '${c_specialities}' where p_ID = ${id} `, function (error, results, fields) {
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

exports.payment = async function (req, res) {
    const errors = {}
    console.log("From body", req.body);
    let id = req.body.id;
    let plan = req.body.type

    dbConn.query(`update PARTNER SET p_ac_status = '1', p_ac_plan_type = '${plan}', subscribed_at = '${Date.now()}' where p_ID = ${id} `, function (error, results, fields) {
        if (error) {
            console.log(error)
            errors.email = "Unable to update Partner payment, Please try again!";
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

exports.getProfile = async function (req, res) {
    const errors = {};
    let id = req.params.id;
    console.log("get from body", id);

    dbConn.query(`select PARTNER.p_ID,PARTNER.p_poc_firstname, PARTNER.p_poc_lastname, PARTNER.p_poc_phone, PARTNER.p_street, PARTNER.p_city, PARTNER.p_state, PARTNER.p_zip,PARTNER.p_email, PartnerCompany.c_name, PartnerCompany.c_logo, PartnerCompany.c_website, PartnerCompany.c_industry, PartnerCompany.c_size, PartnerCompany.c_headquarters, PartnerCompany.c_info, PartnerCompany.c_type, PartnerCompany.c_revenue,PartnerCompany.c_founded,PartnerCompany.c_specialities from PARTNER inner join PartnerCompany ON PARTNER.p_ID = PartnerCompany.p_ID WHERE PARTNER.p_ID = ${id}; `, function (error, results, fields) {
        if (error) {
            errors.email = "Unable to find profile, Please try again!";
            return res.status(400).json(errors);
        } else {

            if (results.length > 0) {

                //user matched
                const payload = {
                    p_ID: results[0].p_ID,
                    p_poc_firstname: results[0].p_poc_firstname,
                    p_poc_lastname: results[0].p_poc_lastname,
                    p_poc_phone: results[0].p_poc_phone,
                    p_email: results[0].p_email,
                    p_street: results[0].p_street,
                    p_city: results[0].p_city,
                    p_state: results[0].p_state,
                    p_zip: results[0].p_zip,
                    c_name: results[0].c_name,
                    c_logo: results[0].c_logo,
                    c_website: results[0].c_website,
                    c_industry: results[0].c_industry,
                    c_size: results[0].c_size,
                    c_headquarters: results[0].c_headquarters,
                    c_info: results[0].c_info,
                    c_revenue: results[0].c_revenue,
                    c_founded: results[0].c_founded,
                    c_specialities: results[0].c_specialities,
                };
                res.json({
                    success: true,
                    payload: payload
                });
            }
        }
    });
}

exports.createJob = async function (req, res) {
    const errors = {}
    console.log("in body", req.body);
    var job = {
        "p_ID": req.body.p_ID,
        "j_role": req.body.jobRole,
        "j_type": req.body.jobType,
        "j_salary": req.body.jobSalary,
        "j_description": req.body.jobDes,
        "j_posted_date": req.body.j_posted_date,
        "j_deadline": req.body.date,
        "city": req.body.jobCity,
        "state": req.body.jobState,
        "country": req.body.jobCountry,
        "zip": req.body.jobZip,
    }
    dbConn.query('INSERT INTO postings SET ?', job, function (error, results, fields) {
        if (error) {
            console.log("err", error)
            errors.email = "Unable to register a job, Please try again!";
            return res.status(400).json(errors);
        } else {
            res.json({
                status: true,
                message: "Job Registered Successfully"
            });
        }
    });

}

exports.getJobs = async function (req, res) {
    const errors = {};
    let id = req.params.id;
    console.log("get from body", id);

    dbConn.query(`select * from postings WHERE p_ID = ${id}; `, function (error, results, fields) {
        if (error) {
            errors.email = "Unable to find postings, Please try again!";
            return res.status(400).json(errors);
        } else {

            if (results.length > 0) {
                res.json({
                    success: true,
                    payload: results
                });
            }
        }
    });
}

exports.getApplied = async function (req, res) {
    const errors = {};
    let jid = req.params.jid;
    let pid = req.params.pid;
    console.log("get from body", jid, pid);

    dbConn.query(`select Application.u_ID, USER.u_firstname, USER.u_lastname from Application inner join USER on Application.u_ID=USER.u_ID where j_ID=${jid}; `, function (error, results, fields) {
        if (error) {
            errors.email = "Unable to find Applied users, Please try again!";
            console.log("error", error);
            return res.status(400).json(errors);
        } else {

            if (results.length > 0) {
                res.json({
                    success: true,
                    payload: results
                });
            }
            else {
                res.json({
                    success: false
                });
            }
        }
    });
}