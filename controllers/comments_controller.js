const Comment=require('../models/comment');
const Post=require('../models/post');
const User=require('../models/user');
const Like=require('../models/likes');

module.exports.create =async function(req,res){
    try{
        let comment=await Comment.create({
            content:req.body.comment_content,
            post:req.params.post_id,
            user:req.user._id
        });

        let post=await Post.findByIdAndUpdate(req.params.post_id,{$push :{comments:comment}});
        post.save();

       
        req.flash('success','Comment published!');
        return res.redirect('back');

    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}

module.exports.delete=async function(req,res){
    try{
        let comment= await Comment.findById(req.params.comment_id).populate('user');
        let post=await Post.findById(comment.post).populate('user');
        
        if(req.user.id == comment.user.id || req.user.id == post.user.id){
            await Like.deleteMany({
                onModel:'Comment',
                likeable:req.params.comment_id
            });

            let post=await Post.findByIdAndUpdate(comment.post,{$pull :{comments:req.params.comment_id}});
            post.save();
            comment.remove();
            req.flash('success',"Comment Deleted!");
            return res.redirect('back');
        }else{
            req.flash('error','Unauthorized');
            return res.redirect('back');
        }
        
         
    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}