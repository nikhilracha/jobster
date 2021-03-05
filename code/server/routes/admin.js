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