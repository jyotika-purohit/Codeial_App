const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
passport.use(new googleStrategy({
        clientID:'975028780016-2tmi84nej791icgs87verpmcc8d7ntmv.apps.googleusercontent.com',
        clientSecret:'9U2ocpRj0OBiHFxKHPARl_yG',
        callbackURL:'http://localhost:8000/users/auth/google/callback'

    },function(accessToken, refreshToken, profile, done){

        User.findOne({email:profile.emails[0].value}).exec(function(error,user){
            if(error){
                console.log("Error in google-oauth-strategy",error);
                return;
            }

            // console.log(profile);
            if(user){
                return done(null,user);
            }else{
                User.create({
                        name:profile.displayName,
                        email:profile.emails[0].value,
                        password:crypto.randomBytes(20).toString('hex')
                    },function(error,user){
                        if(error){    
                            console.log("Error in creating user with google-oauth-strategy",error);
                            return;
                        }
                        return done(null,user);  //this sets user as this req.user, ie; signs in this user
                    }
                );
            }
        });
    }
));

module.exports=passport;