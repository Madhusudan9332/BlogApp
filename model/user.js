const mongoose = require("mongoose");

const address = {
    addressLine1 : {
        type : String,
        required : true
    },
    addressLine2 : {
        type : String,
        default : "-"
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    pincode : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    _id : false
}
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    address : {
         type : address,
         required : true
    },
    role: {
        type : String,
        required : true,
        enum : ["VIEWER", "BLOGGER", "ADMIN"]
    },
    token : {
        type : String,
        default : ""
    },
})

const UserModel = mongoose.model("users", userSchema)

module.exports = UserModel

