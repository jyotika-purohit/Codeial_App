const User=require('../models/user');

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
                console.log("User with theis email already exists");
                return res.redirect('/users/signin');
            }
            User.create(req.body);
            console.log("User created!");
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
    console.log("User logged in !");
    return res.redirect('/');
}

module.exports.signout=function(req,res){
    req.logout();
    return res.redirect('/');
}