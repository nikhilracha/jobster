var express = require("express");
var bodyParser = require('body-parser');
const cors = require("cors");

var user = require('./routes/user');
var partner = require('./routes/partner');
var corefs = require('./routes/corefs');
var admin = require('./routes/admin');

let multer = require('multer');
let upload = multer({ dest: 'uploads/' });

var router = express.Router();
var app = express();

app.use(
    bodyParser.urlencoded({
        extended: false
    }),
    cors()
);
app.use(bodyParser.json());


app.use('/api', router);
app.listen(5000);

router.get('/', function (req, res) {
    res.json({ message: 'Testing Route' });
});

router.post('/login', user.login);//user Login route
router.post('/register', user.register);// user Register route
router.post('/tkn-update', user.tkn_update);//user token route
router.get('/profile/:id', user.getProfile); //user profile retrieval
router.post('/create-profile', upload.fields([
    { name: "u_profpic" },
    { name: "u_resume" }
]), user.createProfile);//Register route
router.post('/update-profile', user.modifyUserProfile); //user profile info modification 
router.post('/update-education-profile', user.modifyUserEducationProfile); //user education profile info modification 
router.post('/update-resume', upload.fields([
    { name: "u_resume" }
]), user.modifyUserResume); //user resume info modification 
router.post('/apply-job', user.applyJob);//Partner login route


router.post('/p-login', partner.login);//Partner login route
router.post('/p-register', partner.register);//Partner login route
router.post('/p-pass-change', partner.changePassword);//Partner change password
router.post('/create-p-profile', partner.createProfile);//Partner login route
router.post('/p-tkn-update', partner.tkn_update);//user token route
router.post('/payment', partner.payment);//user token route
router.get('/p-profile/:id', partner.getProfile); //user profile retrieval
router.post('/update-p-profile', partner.modifyPartnerProfile); //user profile info modification 
router.post('/update-p-company-profile', partner.modifyPartnerCompanyProfile); //user profile info modification 
router.post('/post-job', partner.createJob); //Create a new job
router.get('/jobs/:id', partner.getJobs); //retrieve list of jobs
router.get('/applied/:jid/:pid', partner.getApplied); //retrieve list of applicants

router.post('/search', corefs.search);//postings search

router.post('/a-login', admin.login);//Admin login route
router.post('/create-client', admin.createClient);//create client route
router.get('/clients', admin.clients);//Get clients route
router.get('/clients/:clientid', admin.clientinfo);//Get client route
router.get('/advert', admin.advert);//Get advert route
router.post('/advert', admin.postad);//Post advert route





