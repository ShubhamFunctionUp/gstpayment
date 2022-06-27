const mongoose = require('mongoose');

const accountant = new mongoose.Schema({

    taxPayer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'TaxPayer',
    
    },
    
    totalTaxDue:{
        type:String
    },
    status:{
        type:String,
        enum:["Delayed","New"]
    },
    panCard:{
        type:String,
        required:true
    }


},{timestamps:true})

module.exports = mongoose.model('Accountant',accountant);