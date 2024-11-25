const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType : {
        type : String,
        enum : ["Admin","Buyer"],
        required : true,
    },
    books : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Book",
    }],
});

module.exports = mongoose.model("User",userSchema);
