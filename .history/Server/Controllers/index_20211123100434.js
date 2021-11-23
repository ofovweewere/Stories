"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLogoutPage = exports.ProcessRegisterTrainerPage = exports.ProcessRegisterAuditorPage = exports.ProcessRegisterSeekerPage = exports.ProcessSeekerSearchPage = exports.DisplayRegisterTrainerPage = exports.DisplayRegisterAuditorPage = exports.DisplayRegisterSeekerPage = exports.DisplaySeekerSearch = exports.DisplaySeekerHome = exports.DisplayTrainerHome = exports.DisplayHomePage = void 0;
const passport_1 = __importDefault(require("passport"));
const tennisTrainerSeeker_1 = __importDefault(require("../Models/tennisTrainerSeeker"));
const tennisTrainer_1 = __importDefault(require("../Models/tennisTrainer"));
const auditor_1 = __importDefault(require("../Models/auditor"));
const Util_1 = require("../Util");
const trainer_1 = require("../Util/trainer");
const auditor_2 = require("../Util/auditor");
const rateIndex_1 = require("../Util/rateIndex");
const q_1 = __importDefault(require("q"));
const formidable = require('formidable');
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: '' });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayTrainerHome(req, res, next) {
    let trainerName = req.params.username;
    res.render('index', { title: 'Trainer Page', page: 'trainerHome', username: trainerName, displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayTrainerHome = DisplayTrainerHome;
function DisplaySeekerHome(req, res, next) {
    res.render('index', { title: 'Seeker Home Page', page: 'seekerHome', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplaySeekerHome = DisplaySeekerHome;
function DisplaySeekerSearch(req, res, next) {
    res.render('index', { title: 'Seeker Search Page', page: 'seekerSearch', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplaySeekerSearch = DisplaySeekerSearch;
function DisplayRegisterSeekerPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Seeker registration', page: 'registerSeeker', messages: req.flash('registerMessage'), displayName: (0, Util_1.UserDisplayName)(req) });
    }
    return res.redirect('/tennis');
}
exports.DisplayRegisterSeekerPage = DisplayRegisterSeekerPage;
function DisplayRegisterAuditorPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Auditor registration', page: 'registerAuditor', messages: req.flash('registerMessage'), displayName: (0, auditor_2.AuditorDisplayName)(req) });
    }
    return res.redirect('/tennis');
}
exports.DisplayRegisterAuditorPage = DisplayRegisterAuditorPage;
function DisplayRegisterTrainerPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Register Trainer', page: 'registerTrainer', messages: req.flash('registerMessage'), displayName: (0, trainer_1.TrainerDisplayName)(req) });
    }
    return res.redirect('/tennis');
}
exports.DisplayRegisterTrainerPage = DisplayRegisterTrainerPage;
function ProcessSeekerSearchPage(req, res, next) {
    var deferred = q_1.default.defer();
    let province = req.body.province;
    let city = req.body.city;
    console.log((0, rateIndex_1.rateIndex)(req));
    if (province && !city) {
        tennisTrainer_1.default.find("province", req.body.province, function (err, trainers) {
            tennisTrainer_1.default.find({
                "province": req.body.province,
            }, function (err, docs) {
                if (err) {
                    console.log('Error Finding Files');
                    deferred.reject(err);
                }
                else {
                    var names = [];
                    docs.forEach(function fn(doc) {
                        var item = { title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}` };
                        names.push(item);
                    });
                    deferred.resolve({
                        names: names,
                        respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: (0, auditor_2.AuditorDisplayName)(req) })
                    });
                }
            });
        });
    }
    else if (province && city) {
        tennisTrainer_1.default.find("province", req.body.province, function (err, trainers) {
            tennisTrainer_1.default.find({
                "province": req.body.province
            }, function (err, docs) {
                if (err) {
                    console.log('Error Finding Files');
                    deferred.reject(err);
                }
                else {
                    var names = [];
                    docs.forEach(function fn(doc) {
                        var item = { title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}` };
                        names.push(item);
                    });
                    deferred.resolve({
                        names: names,
                        respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: (0, auditor_2.AuditorDisplayName)(req) })
                    });
                }
            });
        });
    }
}
exports.ProcessSeekerSearchPage = ProcessSeekerSearchPage;
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
function ProcessRegisterAuditorPage(req, res, next) {
    let newUser = new tennisTrainerSeeker_1.default({
        userType: "auditor",
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName
    });
    auditor_1.default.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                req.flash('registerMessage', 'Registration Error');
            }
            console.log('Error: User Already Exists');
            return res.redirect('/registerAuditor');
        }
        return passport_1.default.authenticate('local')(req, res, () => {
            return res.redirect('/home');
        });
    });
}
exports.ProcessRegisterAuditorPage = ProcessRegisterAuditorPage;
function ProcessRegisterTrainerPage(req, res, next) {
    let newUser2 = new tennisTrainer_1.default({
        hourlyRate: req.body.hourlyRate,
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
            console.log("60h sss");
            console.log('Error: User Already Exists');
            return res.json("not successful");
        }
        return passport_1.default.authenticate('local')(req, res, () => {
            return res.redirect('/');
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