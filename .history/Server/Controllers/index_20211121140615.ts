import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';
//create an instance of the seeker model
import SeekerUser from '../Models/tennisTrainerSeeker';

//create an instance of the trainer model
import TrainerUser from '../Models/tennisTrainer';

//import util functions
import{UserDisplayName }from '../Util';
import{TrainerDisplayName }from '../Util/trainer';
import multer from 'multer';
import formidable from "formidable";
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'Assets/images');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
// Display Functions

export function DisplayHomePage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home' , displayName: UserDisplayName(req)});
}


export function DisplayRegisterSeekerPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
       return  res.render('index', { title: 'Seeker registration', page: 'registerSeeker', messages:req.flash('registerMessage'), displayName: UserDisplayName(req)  });
    }
    return res.redirect('/tennis');
}

export function DisplayRegisterTrainerPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
       return  res.render('index', { title: 'Register Trainer', page: 'registerTrainer', messages:req.flash('registerMessage'), displayName: TrainerDisplayName(req)  });
    }
    return res.redirect('/tennis');
}


export function ProcessRegisterSeekerPage(req: Request, res: Response, next: NextFunction): void
{
   // Instantiate a new User object 
   let newUser = new SeekerUser
   ({
       userType:"seeker",
       username: req.body.username,
       emailAddress: req.body.emailAddress,
       displayName: req.body.FirstName + " " + req.body.LastName
   });

   SeekerUser.register(newUser, req.body.password, (err)=>
   {
        if(err)
        {
            console.error('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {
                req.flash('registerMessage', 'Registration Error');
                
            }
            console.log('Error: User Already Exists');
            return res.redirect('/registerSeeker');
        }
        //after successful registration, login the user
        return passport.authenticate('local')(req, res, ()=>{
            
           

            return res.redirect('/home');
        });
   });
}

export function ProcessRegisterTrainerPage(req: Request, res: Response, next: NextFunction): void
{
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
            // create an incoming form object
      var form = new formidable.IncomingForm();
      // specify that we want to allow the user to upload multiple files in a single request
      //form.multiples = true;
      // store all uploads in the /uploads directory
      form.uploadDir = path.basename(path.dirname('/images'))
      // every time a file has been uploaded successfully,
      // rename it to it's orignal name
      form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name), function(err){
            if (err) throw err;
            //console.log('renamed complete: '+file.name);
            const file_path = '/images/'+file.name
        });
      });
      // log any errors that occur
      form.on('error', function(err) {
          console.log('An error has occured: \n' + err);
      });
      // once all the files have been uploaded, send a response to the client
      form.on('end', function() {
           //res.end('success');
           res.statusMessage = "Process cashabck initiated";
           res.statusCode = 200;
           res.redirect('/')
           res.end()
      });
      // parse the incoming request containing the form data
      form.parse(req);
            return res.redirect('/home');
        });
   });
}

export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void
{
    req.logout();
    return res.redirect('login');   
}


