const userModel = require('../models/usermodels');
const taxPayer = require('../models/taxpayer')

const taxPayerController = async function(req,res) {
    try {
    let userId = req.params.userId;
    if(!userId){
        return res.status(404).send({msg:"User not found"})
    }

    let userPresent = await userModel.findById(userId);
    console.log(userPresent);
    if(!userPresent){
        return res.status(404).send({msg:"User not present"})
    }


    let {pan,incomeThroughSalary,otherSourceOfIncome} = req.body;



    let taxPayerIsAvailable = await taxPayer.findOne({userId:userId});
    let taxId = taxPayerIsAvailable._id

    if(pan=="" || typeof(pan)==null || typeof(pan)==undefined){
        return res.status(400).send({msg:"Please enter valid pan details"})
    }

    if(incomeThroughSalary=="" || typeof(incomeThroughSalary)==null || typeof(incomeThroughSalary)==undefined){
        return res.status(400).send({msg:"Please enter valid incomeThroughSalary details"})
    }

    if(otherSourceOfIncome=="" || typeof(otherSourceOfIncome)==null || typeof(otherSourceOfIncome)==undefined){
        return res.status(400).send({msg:"Please enter valid otherSourceOfIncome details"})
    }

    if(!taxPayerIsAvailable){
       
    
        let totalIncome = parseInt(incomeThroughSalary) + parseInt(otherSourceOfIncome)
        let interest = 0;
        if(totalIncome<500000){
            totalIncome = totalIncome;
        }
        else if(totalIncome>500000 && totalIncome<1000000){
            interest = (totalIncome * 15)/100;
            totalIncome = totalIncome+interest
        }else if(totalIncome>1000000 && totalIncome<3000000){
            interest = (totalIncome * 30)/100
            totalIncome = totalIncome + interest
        }else{
            interest = (totalIncome * 40)/100
            totalIncome = totalIncome + interest
        }
    
        req.body.taxAmount = interest;
        req.body.lastPaidDate = new Date();
        req.body.paidOrNot = true;
        req.body.userId = userId;
        req.body.paidOrNot=true
        
    }else{

        let totalIncome = parseInt(incomeThroughSalary) + parseInt(otherSourceOfIncome)
        let interest = 0;
        if(totalIncome<500000){
            totalIncome = totalIncome;
        }
        else if(totalIncome>500000 && totalIncome<1000000){
            interest = (totalIncome * 15)/100;
            totalIncome = totalIncome+interest
        }else if(totalIncome>1000000 && totalIncome<3000000){
            interest = (totalIncome * 30)/100
            totalIncome = totalIncome + interest
        }else{
            interest = (totalIncome * 40)/100
            totalIncome = totalIncome + interest
        }
        req.body.paidOrNot=true
        req.body.taxAmount = interest;
        let body = req.body;
        console.log("yes")
        let data = await taxPayer.findByIdAndUpdate(taxId,body,{new:true});
        console.log(data);
        return res.status(201).send({msg:"updated successfully",data:data});
        

    }
    
    let taxPaid = await taxPayer.create(req.body);
    return res.status(200).send({msg:"Successfully Uploaded",data:taxPaid});


    } catch (error) {
        return res.status(500).send({msg:error.message})    
    }




}

module.exports.taxPayerController = taxPayerController;