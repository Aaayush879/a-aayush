const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    dob:{
        type:Date
    }
});
const Login = new mongoose.model('Login',LoginSchema);
module.exports = Login;