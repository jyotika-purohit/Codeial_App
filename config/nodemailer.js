const nodemailer= require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter = nodemailer.createTransport({
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
  });

let renderTemplate= (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(error,template){
            if(error){
                console.log("Error:",error);
                return;
            }
            mailHTML = template;
        }

    )
        return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate    
};

