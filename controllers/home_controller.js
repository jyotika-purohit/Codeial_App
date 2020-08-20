let Post=require('../models/post');

module.exports.home=async function(req,res){
    try{
        let all_posts=await Post.find({}).populate('user','name');

        return res.render('home',{
            title:"Home | Codeial",
            all_posts:all_posts
        });
        
    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}