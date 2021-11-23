import express from 'express';
const router = express.Router();
export default router;
import multer from 'multer';

import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';
//create an instance of the seeker model
import SeekerUser from '../Models/tennisTrainerSeeker';

//create an instance of the trainer model
import TrainerUser from '../Models/tennisTrainer';
import path from 'path';
//import util functions
import{UserDisplayName }from '../Util';
import{TrainerDisplayName }from '../Util/trainer';
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
  var upload = multer({ storage: storage })

  

  // SET STORAGE
  var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
      }
    })
    
    var upload = multer({ storage: storage })
  
  
// instantiate an object of type index controller
import {DisplayTrainerHome,ProcessSeekerSearchPage,DisplaySeekerSearch,DisplaySeekerHome, DisplayHomePage, DisplayRegisterSeekerPage,DisplayRegisterTrainerPage,DisplayRegisterAuditorPage, ProcessRegisterSeekerPage,ProcessRegisterTrainerPage,ProcessRegisterAuditorPage,ProcessLogoutPage } from '../Controllers/index';

/* GET home page. */
//router.get('/', DisplayHomePage);

/* GET home page. */
router.get('/home', DisplayHomePage);

/* GET about page. */
//router.get('/about', DisplayAboutPage);

/* GET projects page. */
//router.get('/projects', DisplayProjectsPage);

/* GET services page. */
//router.get('/services', DisplayServicesPage);

/* GET contact page. */
//router.get('/contact', DisplayContactPage);

//TODO
// add Login Display and Process
// add Register Display and Process
// process logout

/* GET - Display login page - with /login. */
//router.get('/login', DisplayLoginPage);

/* POST - Process login page when user clicks Login button. */
//router.post('/login', ProcessLoginPage);
/* GET - Display trainer page. */
router.get('/displayTrainerHome/:username', DisplayTrainerHome);
/* GET - Display seeker page . */
router.get('/displaySeekerHome', DisplaySeekerHome);

router.get('/displaySeekerSearch', DisplaySeekerSearch);
/* GET - Display register seeker page - with /registerSeeker. */
router.get('/registerSeeker', DisplayRegisterSeekerPage);

/* GET - Display register trainer page - with /registerTrainer. */
router.get('/registerTrainer', DisplayRegisterTrainerPage);

/* GET - Display register auditor page - with /registerAuditor. */
router.get('/registerAuditor', DisplayRegisterAuditorPage);

/* POST - Process seeker search page when user clicks Search button. */
router.post('/displaySeekerSearch', ProcessSeekerSearchPage);

/* POST - Process register auditor page when user clicks Register button. */
router.post('/registerAuditor', ProcessRegisterAuditorPage);

/* POST - Process register seeker page when user clicks Register button. */
router.post('/registerSeeker', ProcessRegisterSeekerPage);


/* POST - Process register trainer page when user clicks Register button. */
//router.post('/registerTrainer', ProcessRegisterTrainerPage);
/* GET - Process logout page - with /logout. */
router.get('/logout', ProcessLogoutPage);

router.post('/registerTrainer', upload.single('myImage'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      //res.send(file) 
    // Instantiate a new User object 
    console.log(req.body.city);
   let newUser2 = new TrainerUser
   ({  
       hourlyRate: req.body.hourlyRate,
       aboutMe: req.body.aboutMe,
       certificate: file.filename,
       userType:"trainer",
       username: req.body.username,
       emailAddress: req.body.emailAddress,
       phoneNumber: req.body.phoneNumber,
       sex: req.body.sex,
       birthDate: req.body.birthDate,
       province: req.body.province,
       city: req.body.city,
       displayName: req.body.FirstName + " " + req.body.LastName
   });

   TrainerUser.register(newUser2, req.body.password, (err)=>
   {
        if(err)
        {
            console.error('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {
                req.flash('registerMessage', 'Registration Error');
                
            }
            console.log('Error: User Already Exists');
            return res.json("not successful");
        }
        //after successful registration, login the user
        return passport.authenticate('local')(req, res, ()=>{
            
            
            return res.redirect('/home');
        });
   });
    

  })






//module.exports = router;

