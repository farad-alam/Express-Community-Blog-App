const {Schema, model} = require('mongoose');


// username, email, password
const UserSchema = new Schema({
    username : {
        type : String,
        trim : true,
        maxlength : 30,
        minlength : 3,
        required : true,
        unique : true
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    password : {
        type : String,
        minlength : 6,
        required : true
    },
    profile : {
        type : Schema.Types.ObjectId,
        ref : "Profile",
        default : null
    }
},{timestamps: true})

const User = model("User", UserSchema)

module.exports = User;