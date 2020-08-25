const mongoose = require('mongoose');
const likesSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'onModel',
        required:true   
    },
    onModel:{
        type:String,
        enum:['Post','Comment'],
        required:true
    }

},{
    timestamps:true
});

const Like = mongoose.model('Like',likesSchema);
module.exports=Like;