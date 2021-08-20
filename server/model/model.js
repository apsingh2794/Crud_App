const mongoose = require("mongoose");

const employee = new mongoose.Schema({

    name:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true,
        // unique:true,
      
    },
    gender:{
        type:String,
        // required:true
    },
    status:{
        type:String,
        // required:true,
    },
});



const Register = new mongoose.model("CRUD_form_data",employee);
module.exports = Register;