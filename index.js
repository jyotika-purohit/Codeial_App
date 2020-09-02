const express=require('express');
const app=express();
const path=require('path');
const port=8000;
const env = require('./config/environment');
const logger = require('morgan'); //morgan

const db=require('./config/mongoose');
const express_ejs_layouts=require('express-ejs-layouts');
const session=require('express-session');
const passport = require('./config/passport_local_auth');
const MongoStore =require('connect-mongo')(session);
const flash=require('connect-flash');
const customMware=require('./config/middleware');
const passportGoogle=require('./config/passport-google-oauth2-strategy'); //google-oauth-strategy

//setup the chat server to be used with socket.io
const chatServer = require('http').Server(app); //http is inbuilt module
const chat_Sockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("Chat Sevrer is listening on port 5000");

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
var sassMiddleware = require('node-sass-middleware');


if(env.name == 'development'){ //we dont want this to run again and again in prod
    app.use(sassMiddleware({
        /* Options */
        src: path.join(__dirname,env.asset_path,'/scss'),
        dest: path.join(__dirname,env.asset_path,'/css'),
        debug: true,
        outputStyle: 'extended',
        prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
    }));
}

app.use(logger(env.morgan.mode, env.morgan.options));


app.use(express_ejs_layouts);
// app.set('layout extractStyles',true);
// app.set('layout extractScripts',true);
app.use(express.urlencoded());
app.use(express.static(env.asset_path));


app.use(session({
    secret: env.session_cookie_key,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*20
    },
    
    store:new MongoStore(
        {
        mongooseConnection:db,
        autoRemove:'disabled'

        },
        function(error){
            console.log(error || "Connect Mongo setup OK");

        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


app.use(flash());//flash
app.use(customMware.setFlash);

app.use('/',require('./routes/index'));
app.listen(port,function(error){
    if(error){
        console.log("Error:",error);
        return;
    }
    console.log("Server is up and running on port :: ",port);
});
