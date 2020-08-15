const express=require('express');
const app=express();
const path=require('path');
const port=8000;
const express_ejs_layouts=require('express-ejs-layouts');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('assets'));
app.use(express.urlencoded());
app.use(express_ejs_layouts);
app.use('/',require('./routes/index'));
app.listen(port,function(error){
    if(error){
        console.log("Error:",error);
        return;
    }
    console.log("Server is up and running on port :: ",port);

});