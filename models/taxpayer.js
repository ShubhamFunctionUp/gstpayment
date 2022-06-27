const mongoose = require('mongoose');

const taxPayerSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    pan:{
     type:String,
     required:true,
    },
    createdAt:{
        type:Date
    }
    ,
    updatedAt:{
        type:Date
    },
    
    taxAmount:{
        type:String
    },
    
    lastPaidDate:{
        type:Date
    },
    incomeThroughSalary:{
        type:String,
        required:true
    },
    otherSourceOfIncome:{
        type:String
        
    },
    paidOrNot:{
        type:Boolean,
        default:false,
        required:true
    }




},{timestamps:true})

module.exports = mongoose.model('TaxPayer',taxPayerSchema);