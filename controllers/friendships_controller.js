const User = require('../models/user');
const Friendship = require('../models/friendship');
const add_friend_mailer=require('../mailers/add_friend_mailer');

module.exports.create=async function(req,res){
    try{
        let fromUser= await User.findById(req.user.id);
        let toUser=await User.findById(req.params.to_id);
        add_friend_mailer.friendshipMail(fromUser,toUser);
        req.flash('success','Friend request sent!');
        return res.redirect('back');
        
    }catch(error){

        req.flash('error',error);
        return res.redirect('back');
    }
}