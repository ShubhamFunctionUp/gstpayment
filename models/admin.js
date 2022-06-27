const mongoose = require('mongoose');

const admin  = new mongoose.Schema({
    taxPayer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TaxPayer',
        
    },
    panCard:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Admin',admin);