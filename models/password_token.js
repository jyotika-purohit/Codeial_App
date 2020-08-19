const mongoose=require('mongoose');
const tokenSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    isValid:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true
});

const Password_Token=mongoose.model('Password_Token',tokenSchema);
module.exports=Password_Token;