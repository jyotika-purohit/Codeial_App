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
    name:'production',
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key :process.env.CODEIAL_SESSION_COOKIE_KEY,
    db_name : process.env.CODEIAL_DB,
    smtp:{
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.CODEIAL_GMAIL_USERNAME, // generated ethereal user
          pass: process.env.CODEIAL_GMAIL_PASSWORD, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    },
    google_client_ID:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_Secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_URL:process.env.CODEIAL_GOOGLE_CALLBACK_URL
}

module.exports=eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
//if process.env.CODEIAL_ENVIRONMENT is udinfed then it's development