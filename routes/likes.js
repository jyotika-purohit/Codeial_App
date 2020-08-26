const express =require('express');
const router=express.Router();
const likes_controller=require('../controllers/likes_controller');
router.get('/post/:post_id',likes_controller.like_post);
router.get('/remove-like/:like_id',likes_controller.unlike_post);
module.exports=router;