"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLogoutPage = exports.ProcessRegisterTrainerPage = exports.ProcessRegisterSeekerPage = exports.DisplayRegisterTrainerPage = exports.DisplayRegisterSeekerPage = exports.DisplayHomePage = void 0;
const passport_1 = __importDefault(require("passport"));
const tennisTrainerSeeker_1 = __importDefault(require("../Models/tennisTrainerSeeker"));
const tennisTrainer_1 = __importDefault(require("../Models/tennisTrainer"));
const path_1 = __importDefault(require("path"));
const Util_1 = require("../Util");
const trainer_1 = require("../Util/trainer");
const formidable = require('formidable');
const multer = __importStar(require("multer"));
const Loki = __importStar(require("lokijs"));
const DB_NAME = 'db.json';
const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` });
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Assets/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
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
function ProcessRegisterTrainerPage(upload, single) { }
exports.ProcessRegisterTrainerPage = ProcessRegisterTrainerPage;
('avatar'), req;
Request, res;
Response, next;
NextFunction;
void {
    let, newUser2 = new tennisTrainer_1.default({
        userType: "trainer",
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        sex: req.body.sex,
        birthDate: req.body.birthDate,
        province: req.body.province,
        city: req.body.city,
        displayName: req.body.FirstName + " " + req.body.LastName
    }),
    TrainerUser: tennisTrainer_1.default, : .register(newUser2, req.body.password, (err) => {
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                req.flash('registerMessage', 'Registration Error');
            }
            console.log('Error: User Already Exists');
            return res.json("not successful");
        }
        return passport_1.default.authenticate('local')(req, res, () => {
            try {
                const col = loadCollection(COLLECTION_NAME, db);
                const data = col.insert(req.file);
                db.saveDatabase();
                res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
            }
            catch (err) {
                res.sendStatus(400);
            }
            return res.redirect('/home');
        });
    })
};
function ProcessLogoutPage(req, res, next) {
    req.logout();
    return res.redirect('login');
}
exports.ProcessLogoutPage = ProcessLogoutPage;
//# sourceMappingURL=index.js.map