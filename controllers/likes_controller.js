const Like=require('../models/likes');
const Post = require('../models/post');

module.exports.like_post=async function(req,res){
    try{
        
        let like= await Like.findOne({user:req.user._id,
            likeable:req.params.post_id,
            onModel:'Post'
        });

        if(like){ //user has already likes that post 
            return res.redirect('back');
        }

        like=await Like.create({
            user:req.user._id,
            likeable:req.params.post_id,
            onModel:'Post'
        });

        let post=await Post.findByIdAndUpdate(req.params.post_id,{$push: {likes:like}});
        req.flash('success','Post Liked!');
        return res.redirect('back');
    
    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}