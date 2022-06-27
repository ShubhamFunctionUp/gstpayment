const User = require('../models/usermodels');
const TaxPayer = require('../models/taxpayer');
const Accountant = require('../models/taxaccountant');

const Taxaccountant = async function () {
    let {pan} = req.body;
    try {
        let taxPayerIsPresent = await TaxPayer.findOne({pan:pan});
        if(!taxPayerIsPresent){
            return res.status(400).send({msg:"Not tax payer is present with pan details"})
        }


        if(taxPayerIsPresent.paidOrNot===true){
            return res.send({data:taxPayerIsPresent})
        }
        else if(taxPayerIsPresent.paidOrNot===false){
            req.body.totalTaxDue = taxPayerIsPresent.taxAmount;
            req.body.status = "Delayed"
            req.body.taxPayer = taxPayerIsPresent._id;
        }

        let taxAccountantCreated = await Accountant.create(req.body);

        return res.status(200).send({msg:"Successfully",data:taxAccountantCreated});
      


    } catch (error) {
        console.log({msg:error.message});
    }


}



module.exports.Taxaccountant = Taxaccountant;