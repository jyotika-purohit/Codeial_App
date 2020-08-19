const express = require('express');
const passport = require('../config/passport_local_auth');
const router=express.Router();
const users_controller=require('../controllers/users_controller');

//forgot password links -------
router.get('/forgot-password-opt',users_controller.forgot_password_opt);
router.post('/forgot_password',users_controller.send_password_recovery_mail);
router.get('/reset-password/:token',users_controller.new_password_page);
router.post('/reset-password/:token',users_controller.set_new_password);
// -----------------

router.get('/signup',users_controller.signup);
router.get('/signin',users_controller.signin);
router.get('/signout',users_controller.signout);
router.post('/create',users_controller.create);
// router.get('/reset-password/:useremail',users_controller.resetPassword);
router.post('/create_session',
        passport.authenticate('local', { 
        failureRedirect: '/users/signin' })
,users_controller.create_session);

module.exports=router;