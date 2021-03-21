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
router.post('/update-profile', user.modifyUserProfile); //user profile info modification 

router.post('/p-login', partner.login);//Partner login route
router.post('/p-register', partner.register);//Partner login route

router.post('/search', corefs.search);//postings search

router.post('/a-login', admin.login);//Admin login route

router.post('/create-profile', upload.fields([
    { name: "u_profpic" },
    { name: "u_resume" }
]), user.createProfile);//Register route
