var dbConn = require('../config/db.config');
const validateAdminLoginInput = require("../validation/admin/login");
// const validateAdminRegisterInput = require("../validation/admin/register");


exports.login = async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    const { errors, isValid } = validateAdminLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    console.log("in body", req.body);
    dbConn.query("SELECT * FROM ADMIN WHERE a_email = ?", [email], async function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            if (results.length > 0) {

                if (results[0].a_password == password) {
                    // user matched
                    const payload = {
                        id: results[0].a_id,
                        name: results[0].a_lname,
                        email: results[0].a_email,
                    };

                    res.json({
                        tkn_type: "admin",
                        success: true,
                        token: payload
                    });

                } else {
                    errors.password = "Incorrect Password ";
                    return res.status(400).json(errors);
                }

            }
            else {
                errors.email = "Email not found";
                return res.status(404).json(errors);
            }
        }
    });
}


exports.clients = async function (req, res) {
    console.log("in body", req.body);
    dbConn.query("select * from client", async function (error, clients) {
        if (error) {
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            if (clients.length > 0) {
                console.log("clients", clients);
                res.status(200).json(clients);
            }
            else {
                errors.email = "Data not found";
                return res.status(404).json(errors);
            }
        }
    });
}

exports.clientinfo = async function (req, res) {
    console.log("in body", req.body);
    dbConn.query("select * from client where c_id = ? limit 1", [req.params.clientid], async function (error, client) {
        if (error) {
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            if (client.length > 0) {
                console.log("client", client);
                res.status(200).json(client[0]);
            }
            else {
                errors.email = "Data not found";
                return res.status(404).json(errors);
            }
        }
    });
}

exports.advert = async function (req, res) {
    console.log("in body", req.body);
    dbConn.query("select * from postad order by RAND() limit 1", async function (error, advert) {
        if (error) {
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            if (advert.length > 0) {
                console.log("advert", advert);
                res.status(200).json(advert[0]);
            }
            else {
                errors.email = "Data not found";
                return res.status(404).json(errors);
            }
        }
    });
}

exports.postad = async function (req, res) {
    dbConn.query("SELECT max(ad_id)+1 as ad_id from postad", async function (error, response) {
        let ad_id = 1
        if (response.length > 0) {
            ad_id = response[0].ad_id
        }
        var advert = {
            company: req.body.company,
            red_link: req.body.redLink,
            imagelink: req.body.ad,
            ad_id: ad_id
        }
        console.log(advert)
        dbConn.query("INSERT INTO postad SET ?", advert, async function (error, advert) {
            if (error) {
                console.log(error)
                let errors = {}
                errors.message = "Unable to post ad, Please try again!";
                return res.status(400).json(errors);
            }
            else {
                res.json({
                    status: true,
                    message: "Ad Posted Successfully"
                });
            }
        });
    });
}

exports.createClient = async function (req, res) {

    var data = {
        'c_name': req.body.name,
        'industry': req.body.industry,
        'info': req.body.info,
        'headquater': req.body.headquater,
        'ind_type': req.body.type,
        'revenue': req.body.revenue,
        'c_size': req.body.totalEmp,
        'website': req.body.websiteLink,
        'founded': req.body.foundedYear,
        'specialties': req.body.specialties,
        'logo': req.body.imgLink,
    }

    dbConn.query("INSERT INTO client SET ?", data, async function (error, advert) {
        if (error) {
            console.log(error)
            let errors = {}
            errors.message = "Unable to register client, Please try again!";
            return res.status(400).json(errors);
        }
        else {
            res.json({
                status: true,
                message: "Client Registered Successfully"
            });
        }
    });

}