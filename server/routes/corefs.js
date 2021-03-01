var bcrypt = require('bcrypt');
var dbConn = require('../config/db.config');
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");





exports.search = async function (req, res) {
    var sterm = req.body.sterm;
    var sloc = req.body.sloc;



    console.log("in body", req.body);
    dbConn.query("select postings.j_id,postings.j_role,postings.j_type,postings.j_salary,postings.j_description,postings.j_posted_date,postings.j_deadline,PARTNER.p_companyname,PARTNER.p_company_logo,PARTNER.p_state,PARTNER.p_city from postings inner join PARTNER on postings.p_id=PARTNER.p_ID;", async function (error, results, fields) {
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
                errors.email = "Data not found";
                return res.status(404).json(errors);
            }
        }
    });
}