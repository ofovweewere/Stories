"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLogoutPage = exports.ProcessRegisterTrainerPage = exports.ProcessRegisterSeekerPage = exports.DisplayRegisterTrainerPage = exports.DisplayRegisterSeekerPage = exports.DisplayHomePage = void 0;
const passport_1 = __importDefault(require("passport"));
const tennisTrainerSeeker_1 = __importDefault(require("../Models/tennisTrainerSeeker"));
const tennisTrainer_1 = __importDefault(require("../Models/tennisTrainer"));
const Util_1 = require("../Util");
const trainer_1 = require("../Util/trainer");
const formidable = require('formidable');
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayRegisterSeekerPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Seeker registration', page: 'registerSeeker', messages: req.flash('registerMessage'), displayName: (0, Util_1.UserDisplayName)(req) });
    }
    return res.redirect('/tennis');
}
exports.DisplayRegisterSeekerPage = DisplayRegisterSeekerPage;
function DisplayRegisterTrainerPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Register Trainer', page: 'registerTrainer', messages: req.flash('registerMessage'), displayName: (0, trainer_1.TrainerDisplayName)(req) });
    }
    return res.redirect('/tennis');
}
exports.DisplayRegisterTrainerPage = DisplayRegisterTrainerPage;
function ProcessRegisterSeekerPage(req, res, next) {
    let newUser = new tennisTrainerSeeker_1.default({
        userType: "seeker",
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName
    });
    tennisTrainerSeeker_1.default.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                req.flash('registerMessage', 'Registration Error');
            }
            console.log('Error: User Already Exists');
            return res.redirect('/registerSeeker');
        }
        return passport_1.default.authenticate('local')(req, res, () => {
            return res.redirect('/home');
        });
    });
}
exports.ProcessRegisterSeekerPage = ProcessRegisterSeekerPage;
function ProcessRegisterTrainerPage(req, res, next) {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        }
        else {
            let avatar = req.files.avatar;
            avatar.mv('./uploads/' + avatar.name);
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
    console.log(console.log(req.body.files.foo));
    let newUser2 = new tennisTrainer_1.default({
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
}
exports.ProcessRegisterTrainerPage = ProcessRegisterTrainerPage;
function ProcessLogoutPage(req, res, next) {
    req.logout();
    return res.redirect('login');
}
exports.ProcessLogoutPage = ProcessLogoutPage;
//# sourceMappingURL=index.js.map