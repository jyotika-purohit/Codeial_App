const User=require('../models/user');
const Password_Token=require('../models/password_token');
const crypto=require('crypto');
const reset_password_mailer=require('../mailers/reset_password_mailer');

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signup',{
        title:"Signup | Codeial"
    });
}


module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    
    return res.render('signin',{
        title:"Signin | Codeial"
    });
}


module.exports.create=async function(req,res){

    if(req.body.password == req.body.confirm_password){

        try{

            let user=await User.findOne({email:req.body.email});
            if(user){
                req.flash('error','User with theis email already exists');
                return res.redirect('/users/signin');
            }
            user=await User.create(req.body);
            reset_password_mailer.password_mail(user,user.email);
            req.flash('success','Sign up successful. Lets sign in!');
            return res.redirect('/users/signin');

        }catch(error){

            req.flash('error',error);
            return res.redirect('/');

        }

    }else{
        req.flash('error',"Password and Confirm Password don't match");
        return res.redirect('back');
    }
}


module.exports.create_session=function(req,res){
    req.flash('success','Sign in successful!');
    return res.redirect('/');
}

module.exports.signout=function(req,res){
    req.logout();
    req.flash('success','Sign out successful!');
    return res.redirect('/');
}



// ------------------- Forgot password
module.exports.forgot_password_opt=function(req,res){
    return res.render('forgot_password_page',{
        title:"Forgot Password | Codeial"
    })
}


module.exports.send_password_recovery_mail=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});
        if(user){
            
            let thisToken=await Password_Token.create({
                email:req.body.email,
                token:crypto.randomBytes(20).toString('hex'),
                isValid:true
            });
             
            req.flash('success','Password reset mail sent!');
            reset_password_mailer.password_mail(user.name,user.email,thisToken.token);
        }else{
            req.flash('error','Invalid email Id!');
        }

        return res.redirect('/');
    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}

module.exports.new_password_page=function(req,res){
    return res.render('new_password_page',{
        title:"Set New Password | Codeial",
        token:req.params.token
    });
}

module.exports.set_new_password=async function(req,res){
    if(req.body.password == req.body.confirmpassword){

        try{
            let access_token=await Password_Token.findOne({token:req.params.token});

            if(access_token && access_token.isValid == true){

                    let user=await User.findOne({email:access_token.email});
                    await user.update({password:req.body.password});
                    await access_token.update({isValid:false});
                    req.flash('success','Password Updated!');
                    return res.redirect('/users/signin');

            }else{
                req.flash('error','Invalid session');
                return res.redirect('/users/signin');
            }
        }catch(error){
            req.flash('error',error);
            return res.redirect('/');
        }

    }else{
        req.flash('error','Password and Confirm Password do not match!');
        return res.redirect('back');
    }
}


module.exports.profile=async function(req,res){
    try{


        let user=await User.findById(req.params.user_id).select('name email');
        return res.render('profile',{
            title:"Profile | Codeial",
            user:user
        });

    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}