const express = require('express');
const router=express.Router();
const users_controller=require('../controllers/users_controller');
router.get('/signup',users_controller.signup);
router.get('/signin',users_controller.signin);
router.get('/create',users_controller.create);
module.exports=router;