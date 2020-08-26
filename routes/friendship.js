const express= require('express');
const router=express.Router();
const friendships_controller=require('../controllers/friendships_controller');
router.get('/create/:to_id',friendships_controller.send_req);
router.get('/accept/:from_id,:to_id',friendships_controller.create_friendship);
module.exports=router;