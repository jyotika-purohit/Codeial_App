const express = require('express');
const passport = require('../config/passport_local_auth');
const router=express.Router();
const users_controller=require('../controllers/users_controller');

router.get('/signup',users_controller.signup);
router.get('/signin',users_controller.signin);
router.post('/create',users_controller.create);

router.post('/create_session',
        passport.authenticate('local', { 
        failureRedirect: '/users/signin' })
,users_controller.create_session);

module.exports=router;