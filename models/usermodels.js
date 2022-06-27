const mongoose = require('mongoose');

const user = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        enum:["Mr","Mrs","Miss"]
    },
    name:{
        type:String,
        required:true,
        trim:true
    }, 
    phone:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:15,
        trim:true
    },
    State:{
        type:String,
        enum:[ "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry"],
        required:true
    },
    role:{
        type:String,
        enum:["TaxPayer","TaxAccountant","Admin"],
        required:true
    }
});


module.exports = mongoose.model('User',user)