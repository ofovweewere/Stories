import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';
//create an instance of the user model
import User from '../Models/user';

//import util functions
import{UserDisplayName }from '../Util';

// Display Functions

export function DisplayHomePage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home' , displayName: UserDisplayName(req)});
}


export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
       return  res.render('index', { title: 'Register', page: 'register', messages:req.flash('registerMessage'), displayName: UserDisplayName(req)  });
    }
    return res.redirect('/tennis');
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void
{
   // Instantiate a new User object 
   let newUser = new User
   ({
       username: req.body.username,
       emailAddress: req.body.emailAddress,
       displayName: req.body.FirstName + " " + req.body.LastName
   });

   User.register(newUser, req.body.password, (err)=>
   {
        if(err)
        {
            console.error('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {
                req.flash('registerMessage', 'Registration Error');
                
            }
            console.log('Error: User Already Exists');
            return res.redirect('/register');
        }
        //after successful registration, login the user
        return passport.authenticate('local')(req, res, ()=>{
            return res.redirect('/home');
        });
   });
}

