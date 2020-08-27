const User = require('../models/user');
const Friendship = require('../models/friendship');
const add_friend_mailer=require('../mailers/add_friend_mailer');
const { findOne } = require('../models/user');

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

        let new_friendship =await  Friendship.findOne({
            from:from_user._id,
            to:to_user._id
        });

        if(!new_friendship){
            
        new_friendship = await Friendship.create({
            from:from_user._id,
            to:to_user._id
        });

        await User.findByIdAndUpdate(req.params.from_id,{$push:{friendships:new_friendship}});
        await User.findByIdAndUpdate(req.params.to_id,{$push:{friendships:new_friendship}});

        req.flash('success','Friendship created!');
        return res.redirect('back');
        }else{

            console.log(new_friendship);
            req.flash('error','You are already friends!');
            return res.redirect('/');
        }

    }catch(error){
        req.flash('error',error);
        return res.redirect('back');   
    }
}


module.exports.delete_friendship=async function(req,res){
    try{
        let req_from_user = await User.findById(req.params.from_id);
        let req_to_user = await User.findById(req.params.to_id);

        let friendship = await Friendship.findOne({
            from:req_from_user,
            to:req_to_user
        });

        if(!friendship){
            friendship=await Friendship.findOne({
                from:req_to_user,
                to:req_from_user
            });
        }

        await User.findByIdAndUpdate(friendship.from,{$pull:{friendships:friendship._id}});
        await User.findByIdAndUpdate(friendship.to,{$pull:{friendships:friendship._id}});
        friendship.remove();

        req.flash('success',"Friendship removed!");
        return res.redirect('back');

    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}