const passport = require('passport');
const LocalStrategy=require('passport-local');
const User=require('../models/user');

passport.use(new LocalStrategy(
    {usernameField:'email'},
    function(email,password,done){
        User.findOne({email:email},function(error,user){
            if(error){
                return done(error);
            }

            if( !user || user.password!=password ){
                return done(null,false);
            }

            return done(null,user);

        });
    }
));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });

});

passport.checkAuthentication = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser=function(req,res,next){
    
    if(req.isAuthenticated()){
        res.locals.localuser = req.user;
    }

    next();
}


module.exports=passport;

