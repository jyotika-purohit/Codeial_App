const Post=require('../models/post');
const User=require('../models/user');
const Comment=require('../models/comment');
const Like=require('../models/likes');

module.exports.create=async function(req,res){
    try{

        let post=await Post.create({
            content:req.body.post_content,
            user:req.user._id
        });

        req.flash('success','Post published!');
        return res.redirect('back');
        
    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}

module.exports.deletePost=async function(req,res){
     try{
        let post=await Post.findById(req.params.post_id);
        await Like.deleteMany({likeable:{$in:post.comments}});
        await Like.deleteMany({likeable:req.params.post_id});
        await Comment.deleteMany({post:req.params.post_id});
        post.remove();
        req.flash('success','Post deleted');
        return res.redirect('back');
     }catch(error){
         console.log("Error",error);
         return res.redirect('back');
     }
}