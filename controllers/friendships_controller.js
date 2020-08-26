const User = require('../models/user');
const Friendship = require('../models/friendship');
const add_friend_mailer=require('../mailers/add_friend_mailer');

module.exports.send_req=async function(req,res){
    try{
        let fromUser= await User.findById(req.user.id);
        let toUser=await User.findById(req.params.to_id);
        add_friend_mailer.friendshipMail(fromUser,toUser);
        req.flash('success','Friend request sent!');
        return res.redirect('/');
        
    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}

module.exports.create_friendship=async function(req,res){
    try{
        let from_user = await User.findById(req.params.from_id);
        let to_user = await User.findById(req.params.to_id);

        let new_friendship = await Friendship.create({
            from:from_user._id,
            to:to_user._id
        });

        await User.findByIdAndUpdate(req.params.from_id,{$push:{friendships:new_friendship}});
        await User.findByIdAndUpdate(req.params.to_id,{$push:{friendships:new_friendship}});

        req.flash('success','Friendship created!');
        return res.redirect('back');

    }catch(error){
        req.flash('error',error);
        return res.redirect('back');   
    }
}