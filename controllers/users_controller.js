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
    try{
        

    }catch(error){
        console.log("Error:",error);
        return res.redirect('/');
    }
}