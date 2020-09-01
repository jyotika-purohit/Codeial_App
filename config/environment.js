const development = {
    name:'development',
    asset_path : './assets',
    session_cookie_key :'blah something',
    db_name : 'Codeial_App_Development',
    smtp:{
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'codeial0205@gmail.com', // generated ethereal user
          pass: 'codeial_pwd@12', // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    },
    google_client_ID:'975028780016-2tmi84nej791icgs87verpmcc8d7ntmv.apps.googleusercontent.com',
    google_client_Secret:'9U2ocpRj0OBiHFxKHPARl_yG',
    google_callback_URL:'http://localhost:8000/users/auth/google/callback'
}
const production = {
    name:'production'
}

module.exports=development;