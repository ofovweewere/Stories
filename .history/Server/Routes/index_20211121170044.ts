import express from 'express';
const router = express.Router();
export default router;
import multer from 'multer';

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
    
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file) 

  })






//module.exports = router;

