var bcrypt = require('bcrypt');
var dbConn = require('../config/db.config');
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");


exports.search = async function (req, res) {
    var sterm = req.body.sterm;
    var sloc = req.body.sloc;
    var errors = {}

    console.log("in body", req.body);
    //dbConn.query("select postings.j_id,postings.j_role,postings.j_type,postings.j_salary,postings.j_description,postings.j_posted_date,postings.j_deadline,PARTNER.p_companyname,PARTNER.p_company_logo,PARTNER.p_state,PARTNER.p_city from postings inner join PARTNER on postings.p_id=PARTNER.p_ID;", async function (error, results, fields) {
    dbConn.query(`select postings.j_id,postings.j_role,postings.j_type,postings.j_salary,postings.j_description,postings.j_posted_date,postings.j_deadline,PARTNER.p_companyname,PARTNER.p_company_logo,PARTNER.p_state,PARTNER.p_city, postings.city, postings.state, postings.zip from postings inner join PARTNER on postings.p_id=PARTNER.p_ID WHERE ((j_role LIKE '%${sterm}%' or p_companyname LIKE '%${sterm}%') AND (city LIKE '%${sloc}%' or state LIKE '%${sloc}%' or zip = '${sloc}'));`, async function (error, results) {
        if (error) {
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            if (results.length > 0) {
                console.log("results", results);
                res.status(200).json(results);
            }
            else {
                console.log("Errors", error)
                errors.search = "Not found"
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

        if(response.length > 0) {
            ad_id= response[0].ad_id
        }
        
        var advert = {
            company: req.body.company,
            red_link: req.body.redLink,
            imagelink: req.body.ad,
            // img: req.body.imageLocal,
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