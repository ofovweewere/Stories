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
import { DisplayHomePage, DisplayRegisterSeekerPage,DisplayRegisterTrainerPage, ProcessRegisterSeekerPage,ProcessRegisterTrainerPage,ProcessLogoutPage } from '../Controllers/index';

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

/* GET - Display register seeker page - with /registerSeeker. */
router.get('/registerSeeker', DisplayRegisterSeekerPage);

/* GET - Display register trainer page - with /registerTrainer. */
router.get('/registerTrainer', DisplayRegisterTrainerPage);

/* POST - Process register seeker page when user clicks Register button. */
router.post('/registerSeeker', ProcessRegisterSeekerPage);

/* POST - Process register trainer page when user clicks Register button. */
//router.post('/registerTrainer', ProcessRegisterTrainerPage);
/* GET - Process logout page - with /logout. */
router.get('/logout', ProcessLogoutPage);

router.post('/registerTrainer', upload.single('myImage'), (req, res, next) => {
    // Instantiate a new User object 
   let newUser2 = new TrainerUser
   ({
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

