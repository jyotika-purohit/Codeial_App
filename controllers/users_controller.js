const User=require('../models/user');

const reset_password_mailer=require('../mailers/reset_password_mailer');


module.exports.signup=function(req,res){
    
    return res.render('signup',{
        title:"Signup | Codeial"
    });
}


module.exports.signin=function(req,res){

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

            console.log("Error:",error);
            return res.redirect('/');

        }

    }else{
        console.log("Password and Confirm Password don't match");
        return res.redirect('back');
    }
}


module.exports.create_session=function(req,res){
    req.flash('success','Sign in successful!');
    console.log("User logged in !");
    return res.redirect('/');
}

module.exports.signout=function(req,res){
    req.logout();
    return res.redirect('/');
}