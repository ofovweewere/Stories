import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';
//create an instance of the seeker model
import SeekerUser from '../Models/tennisTrainerSeeker';

//create an instance of the trainer model
import TrainerUser from '../Models/tennisTrainer';

//create an instance of the auditor model
import AuditorUser from '../Models/auditor';
import path from 'path';
//import util functions
import{UserDisplayName }from '../Util';
import{TrainerDisplayName }from '../Util/trainer';
import{AuditorDisplayName }from '../Util/auditor';
import{rateIndex }from '../Util/rateIndex';
import q from 'q';
const formidable = require('formidable');



// Display Functions

export function DisplayHomePage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home' , displayName: ''});
}

export function DisplayTrainerHome(req: Request, res: Response, next: NextFunction): void
{

    let trainerName = req.params.username;

        // find requested trainer information
        TrainerUser.find({
            "username":trainerName

        }, 
        function(err, docs) {
            if (err) {
             console.log('Error Finding Files');
             deferred.reject(err);
            } else {
    
              let hourlyRate = `${docs.hourlyRate}`;
              let aboutMe = `${docs.aboutMe}`;
              let emailAddress = `${docs.emailAddress}`;
              let displayName = `${docs.displayName}`;
              let phoneNumber = `${docs.phoneNumber}`;
              let sex = `${docs.sex}`;
              let birthDate = `${docs.birthDate}`;
              let province = `${docs.province}`;
              let city = `${docs.city}`;
              /*
              deferred.resolve({
                  hourlyRate: hourlyRate
                  aboutMe: aboutMe
                  emailAddress: emailAddress
                  displayName: displayName
                  phoneNumber: phoneNumber
                  sex: sex
                  birthDate: birthDate
                  province: province
                  city: city
                  respond: res.render('index', { title: 'Trainer Page', page: 'trainerHome' ,city: city,province: province,birthDate: birthDate,sex: sex,hourlyRate: hourlyRate, aboutMe: aboutMe, emailAddress: emailAddress,displayName: displayName,phoneNumber: phoneNumber,username: trainerName, displayName: UserDisplayName(req)  });
             }); // return all names
            */
            
            }
         });
    
    
}

export function DisplaySeekerHome(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Seeker Home Page', page: 'seekerHome' , displayName: UserDisplayName(req)});
}

export function DisplaySeekerSearch(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Seeker Search Page', page: 'seekerSearch' , displayName: UserDisplayName(req)});
}


export function DisplayRegisterSeekerPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
       return  res.render('index', { title: 'Seeker registration', page: 'registerSeeker', messages:req.flash('registerMessage'), displayName: UserDisplayName(req)  });
    }
    return res.redirect('/tennis');
}

export function DisplayRegisterAuditorPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
       return  res.render('index', { title: 'Auditor registration', page: 'registerAuditor', messages:req.flash('registerMessage'), displayName: AuditorDisplayName(req)  });
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
export function ProcessSeekerSearchPage(req: Request, res: Response, next: NextFunction): void
{
  var deferred = q.defer();
  let province = req.body.province;
  let city =req.body.city;
   
    let minAmount =0;
    let maxAmount =51;
  if(province && !city)
  {
    // find all athletes who play tennis, selecting the 'name' and 'age' fields
    if(rateIndex(req) === "1")
    {
        TrainerUser.find({
            "province":req.body.province,
            "hourlyRate": { $gt: minAmount, $lt: maxAmount },
            $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
            
        }, 
        function(err, docs) {
            if (err) {
             console.log('Error Finding Files');
             deferred.reject(err);
            } else {
    
              
              var names = [];
              docs.forEach (function fn(doc) {
                var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                
                names.push(item);// pushed in names array
                
              });
              
              deferred.resolve({
                  names: names
                  respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
             }); // return all names
            
           
            
            }
         });
    
    }

    else if(rateIndex(req) === "2")
    {
        minAmount =50;
        maxAmount = 101;
        TrainerUser.find({
            "province":req.body.province,
            "hourlyRate": { $gt: minAmount, $lt: maxAmount },
            $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
            
        }, 
        function(err, docs) {
            if (err) {
             console.log('Error Finding Files');
             deferred.reject(err);
            } else {
    
              
              var names = [];
              docs.forEach (function fn(doc) {
                var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                
                names.push(item);// pushed in names array
                
              });
              
              deferred.resolve({
                  names: names
                  respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
             }); // return all names
            
           
            
            }
         });
    
    }
    
    else if(rateIndex(req) === "3")
    {
        minAmount =100;
        maxAmount = 201;
        TrainerUser.find({
            "province":req.body.province,
            "hourlyRate": { $gt: minAmount, $lt: maxAmount },
            $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
            
        }, 
        function(err, docs) {
            if (err) {
             console.log('Error Finding Files');
             deferred.reject(err);
            } else {
    
              
              var names = [];
              docs.forEach (function fn(doc) {
                var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                
                names.push(item);// pushed in names array
                
              });
              
              deferred.resolve({
                  names: names
                  respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
             }); // return all names
            
           
            
            }
         });

         
    
    }
    
    else if(rateIndex(req) === "4")
    {
        minAmount =200;
        maxAmount = 301;
        TrainerUser.find({
            "province":req.body.province,
            "hourlyRate": { $gt: minAmount, $lt: maxAmount },
            $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
            
        }, 
        function(err, docs) {
            if (err) {
             console.log('Error Finding Files');
             deferred.reject(err);
            } else {
    
              
              var names = [];
              docs.forEach (function fn(doc) {
                var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                
                names.push(item);// pushed in names array
                
              });
              
              deferred.resolve({
                  names: names
                  respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
             }); // return all names
            
           
            
            }
         });

         
    
    }
    
    else if(rateIndex(req) === "5")
    {
        minAmount =300;
        maxAmount = 401;
        TrainerUser.find({
            "province":req.body.province,
            "hourlyRate": { $gt: minAmount, $lt: maxAmount },
            $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
            
        }, 
        function(err, docs) {
            if (err) {
             console.log('Error Finding Files');
             deferred.reject(err);
            } else {
    
              
              var names = [];
              docs.forEach (function fn(doc) {
                var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                
                names.push(item);// pushed in names array
                
              });
              
              deferred.resolve({
                  names: names
                  respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
             }); // return all names
            
           
            
            }
         });
    
    }

    else if(rateIndex(req) === "6")
    {
        minAmount =399;
        
        TrainerUser.find({
            "province":req.body.province,
            "hourlyRate": { $gt: minAmount } ,
            $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
            
        }, 
        function(err, docs) {
            if (err) {
             console.log('Error Finding Files');
             deferred.reject(err);
            } else {
    
              
              var names = [];
              docs.forEach (function fn(doc) {
                var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                
                names.push(item);// pushed in names array
                
              });
              
              deferred.resolve({
                  names: names
                  respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
             }); // return all names
            
           
            
            }
         });
    
    }
    
    
}
  

  else if(province && city)
  {
      // find all athletes who play tennis, selecting the 'name' and 'age' fields
    if(rateIndex(req) === "1")
    {
        TrainerUser.find({
            "province":req.body.province,
            "city":req.body.city,
            "hourlyRate": { $gt: minAmount, $lt: maxAmount },
            $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
            
        }, 
        function(err, docs) {
            if (err) {
             console.log('Error Finding Files');
             deferred.reject(err);
            } else {
    
              
              var names = [];
              docs.forEach (function fn(doc) {
                var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                
                names.push(item);// pushed in names array
                
              });
              
              deferred.resolve({
                  names: names
                  respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
             }); // return all names
            
           
            
            }
         });
    
    }

    else if(rateIndex(req) === "2")
    {
        minAmount =50;
        maxAmount = 101;
        TrainerUser.find({
            "province":req.body.province,
            "city":req.body.city,
            "hourlyRate": { $gt: minAmount, $lt: maxAmount },
            $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
            
        }, 
        function(err, docs) {
            if (err) {
             console.log('Error Finding Files');
             deferred.reject(err);
            } else {
    
              
              var names = [];
              docs.forEach (function fn(doc) {
                var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                
                names.push(item);// pushed in names array
                
              });
              
              deferred.resolve({
                  names: names
                  respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
             }); // return all names
            
           
            
            }
         });
    
    }
    
    else if(rateIndex(req) === "3")
    {
        minAmount =100;
        maxAmount = 201;
        TrainerUser.find({
            "province":req.body.province,
            "city":req.body.city,
            "hourlyRate": { $gt: minAmount, $lt: maxAmount },
            $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
            
        }, 
        function(err, docs) {
            if (err) {
             console.log('Error Finding Files');
             deferred.reject(err);
            } else {
    
              
              var names = [];
              docs.forEach (function fn(doc) {
                var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                
                names.push(item);// pushed in names array
                
              });
              
              deferred.resolve({
                  names: names
                  respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
             }); // return all names
            
           
            
            }
         });

         
    
    }
    
    else if(rateIndex(req) === "4")
    {
        minAmount =200;
        maxAmount = 301;
        TrainerUser.find({
            "province":req.body.province,
            "city":req.body.city,
            "hourlyRate": { $gt: minAmount, $lt: maxAmount },
            $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
            
        }, 
        function(err, docs) {
            if (err) {
             console.log('Error Finding Files');
             deferred.reject(err);
            } else {
    
              
              var names = [];
              docs.forEach (function fn(doc) {
                var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                
                names.push(item);// pushed in names array
                
              });
              
              deferred.resolve({
                  names: names
                  respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
             }); // return all names
            
           
            
            }
         });

         
    
    }
    
    else if(rateIndex(req) === "5")
    {
        minAmount =300;
        maxAmount = 401;
        TrainerUser.find({
            "province":req.body.province,
            "city":req.body.city,
            "hourlyRate": { $gt: minAmount, $lt: maxAmount },
            $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
            
        }, 
        function(err, docs) {
            if (err) {
             console.log('Error Finding Files');
             deferred.reject(err);
            } else {
    
              
              var names = [];
              docs.forEach (function fn(doc) {
                var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                
                names.push(item);// pushed in names array
                
              });
              
              deferred.resolve({
                  names: names
                  respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
             }); // return all names
            
           
            
            }
         });
    
    }

    else if(rateIndex(req) === "6")
    {
        minAmount =399;
        
        TrainerUser.find({
            "province":req.body.province,
            "city":req.body.city,
            "hourlyRate": { $gt: minAmount } ,
            $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
            
        }, 
        function(err, docs) {
            if (err) {
             console.log('Error Finding Files');
             deferred.reject(err);
            } else {
    
              
              var names = [];
              docs.forEach (function fn(doc) {
                var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                
                names.push(item);// pushed in names array
                
              });
              
              deferred.resolve({
                  names: names
                  respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
             }); // return all names
            
           
            
            }
         });
    
    }
  }  
  
  //Search by only price and gender
  else
  {
      // find all athletes who play tennis, selecting the 'name' and 'age' fields
      if(rateIndex(req) === "1")
      {
          TrainerUser.find({
              
              "hourlyRate": { $gt: minAmount, $lt: maxAmount },
              $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
              
          }, 
          function(err, docs) {
              if (err) {
               console.log('Error Finding Files');
               deferred.reject(err);
              } else {
      
                
                var names = [];
                docs.forEach (function fn(doc) {
                  var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                  
                  names.push(item);// pushed in names array
                  
                });
                
                deferred.resolve({
                    names: names
                    respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
               }); // return all names
              
             
              
              }
           });
      
      }
  
      else if(rateIndex(req) === "2")
      {
          minAmount =50;
          maxAmount = 101;
          TrainerUser.find({
              
              "hourlyRate": { $gt: minAmount, $lt: maxAmount },
              $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
              
          }, 
          function(err, docs) {
              if (err) {
               console.log('Error Finding Files');
               deferred.reject(err);
              } else {
      
                
                var names = [];
                docs.forEach (function fn(doc) {
                  var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                  
                  names.push(item);// pushed in names array
                  
                });
                
                deferred.resolve({
                    names: names
                    respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
               }); // return all names
              
             
              
              }
           });
      
      }
      
      else if(rateIndex(req) === "3")
      {
          minAmount =100;
          maxAmount = 201;
          TrainerUser.find({
              
              "hourlyRate": { $gt: minAmount, $lt: maxAmount },
              $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
              
          }, 
          function(err, docs) {
              if (err) {
               console.log('Error Finding Files');
               deferred.reject(err);
              } else {
      
                
                var names = [];
                docs.forEach (function fn(doc) {
                  var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                  
                  names.push(item);// pushed in names array
                  
                });
                
                deferred.resolve({
                    names: names
                    respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
               }); // return all names
              
             
              
              }
           });
  
           
      
      }
      
      else if(rateIndex(req) === "4")
      {
          minAmount =200;
          maxAmount = 301;
          TrainerUser.find({
              
              "hourlyRate": { $gt: minAmount, $lt: maxAmount },
              $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
              
          }, 
          function(err, docs) {
              if (err) {
               console.log('Error Finding Files');
               deferred.reject(err);
              } else {
      
                
                var names = [];
                docs.forEach (function fn(doc) {
                  var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                  
                  names.push(item);// pushed in names array
                  
                });
                
                deferred.resolve({
                    names: names
                    respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
               }); // return all names
              
             
              
              }
           });
  
           
      
      }
      
      else if(rateIndex(req) === "5")
      {
          minAmount =300;
          maxAmount = 401;
          TrainerUser.find({
              
              "hourlyRate": { $gt: minAmount, $lt: maxAmount },
              $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
              
          }, 
          function(err, docs) {
              if (err) {
               console.log('Error Finding Files');
               deferred.reject(err);
              } else {
      
                
                var names = [];
                docs.forEach (function fn(doc) {
                  var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                  
                  names.push(item);// pushed in names array
                  
                });
                
                deferred.resolve({
                    names: names
                    respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
               }); // return all names
              
             
              
              }
           });
      
      }
  
      else if(rateIndex(req) === "6")
      {
          minAmount =399;
          
          TrainerUser.find({
              
              "hourlyRate": { $gt: minAmount } ,
              $or: [ { "sex":req.body.sex }, { "anyGender":req.body.sex} ]
              
          }, 
          function(err, docs) {
              if (err) {
               console.log('Error Finding Files');
               deferred.reject(err);
              } else {
      
                
                var names = [];
                docs.forEach (function fn(doc) {
                  var item = {title: `${doc.displayName}`, description: `${doc.aboutMe}`, username: `${doc.username}`, hourlyRate: `${doc.hourlyRate}`};
                  
                  names.push(item);// pushed in names array
                  
                });
                
                deferred.resolve({
                    names: names
                    respond: res.render('index', { title: 'Search Results', page: 'searchResult', name: names, displayName: AuditorDisplayName(req)  })
               }); // return all names
              
             
              
              }
           });
      
      }
  }
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

export function ProcessRegisterAuditorPage(req: Request, res: Response, next: NextFunction): void
{
   // Instantiate a new User object 
   let newUser = new SeekerUser
   ({
       userType:"auditor",
       username: req.body.username,
       emailAddress: req.body.emailAddress,
       displayName: req.body.FirstName + " " + req.body.LastName
   });

   AuditorUser.register(newUser, req.body.password, (err)=>
   {
        if(err)
        {
            console.error('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {
                req.flash('registerMessage', 'Registration Error');
                
            }
            console.log('Error: User Already Exists');
            return res.redirect('/registerAuditor');
        }
        //after successful registration, login the user
        return passport.authenticate('local')(req, res, ()=>{
            
           

            return res.redirect('/home');
        });
   });
}



export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void
{
    req.logout();
    return res.redirect('login');   
}


