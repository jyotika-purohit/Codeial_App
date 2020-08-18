const nodemailer=require('../config/nodemailer');

exports.password_mail = (user,email) => {
    let htmlString = nodemailer.renderTemplate({user:user},'/reset_password.ejs');
    nodemailer.transporter.sendMail({
        from: 'codeial0205@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Codeial | Password Reset", // Subject line
        html: htmlString, // html body
    },(error,info) => {
        if(error){
            console.log("Error:",error);
            return;
        }
        return;
    })
};

