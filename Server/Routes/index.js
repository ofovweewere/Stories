"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const multer_1 = __importDefault(require("multer"));
const passport_1 = __importDefault(require("passport"));
const tennisTrainer_1 = __importDefault(require("../Models/tennisTrainer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
var upload = (0, multer_1.default)({ storage: storage });
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
var upload = (0, multer_1.default)({ storage: storage });
const index_1 = require("../Controllers/index");
router.get('/home', index_1.DisplayHomePage);
router.get('/registerSeeker', index_1.DisplayRegisterSeekerPage);
router.get('/registerTrainer', index_1.DisplayRegisterTrainerPage);
router.post('/registerSeeker', index_1.ProcessRegisterSeekerPage);
router.get('/logout', index_1.ProcessLogoutPage);
router.post('/registerTrainer', upload.single('myImage'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    let newUser2 = new tennisTrainer_1.default({
        aboutMe: req.body.aboutMe,
        certificate: file.filename,
        userType: "trainer",
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        sex: req.body.sex,
        birthDate: req.body.birthDate,
        province: req.body.province,
        city: req.body.city,
        displayName: req.body.FirstName + " " + req.body.LastName
    });
    tennisTrainer_1.default.register(newUser2, req.body.password, (err) => {
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                req.flash('registerMessage', 'Registration Error');
            }
            console.log('Error: User Already Exists');
            return res.json("not successful");
        }
        return passport_1.default.authenticate('local')(req, res, () => {
            return res.redirect('/home');
        });
    });
});
//# sourceMappingURL=index.js.map