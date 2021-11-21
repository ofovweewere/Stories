import express from 'express';
const router = express.Router();
export default router;

// instantiate an object of type index controller
import { DisplayHomePage, DisplayRegisterSeekerPage, ProcessRegisterSeekerPage } from '../Controllers/index';

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

/* GET - Display register trainer page - with /trainerRegister. */
router.get('/trainerRegister', DisplayTrainerRegisterPage);

/* POST - Process register page when user clicks Register button. */
router.post('/registerSeeker', ProcessRegisterSeekerPage);

/* GET - Process logout page - with /logout. */
//router.get('/logout', ProcessLogoutPage);





//module.exports = router;

