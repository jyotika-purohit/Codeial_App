const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const env = require('./environment');
passport.use(new googleStrategy({
        clientID:env.google_client_ID,
        clientSecret:env.google_client_Secret,
        callbackURL:env.google_callback_URL

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