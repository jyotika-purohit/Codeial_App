const express= require('express');
const router=express.Router();
const friendships_controller=require('../controllers/friendships_controller');
router.get('/create/:to_id',friendships_controller.create);
module.exports=router;