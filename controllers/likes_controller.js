const Like=require('../models/likes');
const Post = require('../models/post');
const Comment=require('../models/comment');

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
        post.save();
        req.flash('success','Post Liked!');
        return res.redirect('back');
    
    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}

module.exports.like_comment=async function(req,res){
    try{
        
        let like= await Like.findOne({user:req.user._id,
            likeable:req.params.comment_id,
            onModel:'Comment'
        });

        if(like){ //user has already likes that post 
            return res.redirect('back');
        }

        like=await Like.create({
            user:req.user._id,
            likeable:req.params.comment_id,
            onModel:'Comment'
        });

        let comment=await Comment.findByIdAndUpdate(req.params.comment_id,{$push: {likes:like}});
        comment.save();
        req.flash('success','Comment Liked!');
        return res.redirect('back');
    
    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}

module.exports.unlike=async function(req,res){
    try{
        let this_like=await Like.findById(req.params.like_id);
        let type;

        if(this_like.onModel == "Post"){
            type=Post;
        }else{
            type=Comment;
        }

        let record = await type.findByIdAndUpdate(this_like.likeable,{$pull:{likes:this_like._id}});
        record.save();
        this_like.remove();

        req.flash('success',"Like removed");
        return res.redirect('back');
    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}