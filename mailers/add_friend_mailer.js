const nodemailer= require('../config/nodemailer');
exports.friendshipMail = (from,to) => {

    let htmlString = nodemailer.renderTemplate({from:from,to:to},'/add_friend.ejs');

    nodemailer.transporter.sendMail({
        from: 'codeial0205@gmail.com', // sender address
        to: to.email, // list of receivers
        subject: "Codeial | New Friend Request!", // Subject line
        html: htmlString, // html body
    },(error,info) => {
        
        if(error){
            console.log("Error:",error);
            return;
        }
        return;
    })
};