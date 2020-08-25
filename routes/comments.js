const express=require('express');
const router = express.Router();
const comments_controller = require('../controllers/comments_controller');
router.post('/create/:post_id',comments_controller.create);
router.get('/delete/:comment_id',comments_controller.delete);
module.exports=router;