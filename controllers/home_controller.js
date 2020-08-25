const Post=require('../models/post');
const User= require('../models/user');

module.exports.home=async function(req,res){
    try{
        let all_posts=await Post.find({})
        .sort('-createdAt')
        .populate('user','name')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
        .populate({
            path:'likes',
            populate:{
                path:'user'
            }
        }); 

        let all_users=await User.find({}).select('name email');

        return res.render('home',{
            title:"Home | Codeial",
            all_posts:all_posts,
            all_users:all_users
        });
        
    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}