
const express = require('express');
const Tax = require('../controller/taxpayer');
const TaxAccount = require('../controller/taxaccountant')
const router = express.Router();
const User = require('../controller/user')
// Login
router.post('/Login',User.login)


// User
router.post('/CreateUser',User.createUser)
router.get('/GetUser')
router.put('/UpdateUser')

// Tax payers
router.post('/user/:userId/taxpayer',Tax.taxPayerController);
router.get('/user/:userId/taxpayer');
router.put('/user/:userId/taxpayer')
router.post('/loginTaxPayer')

// Tax Accountant
router.get('/AccountantViewTaxpayer/:taxPayerId');
router.put('/AccountantUpdateTaxpayer/:taxPayerId')
router.post('/AccountantCreateTaxpayer',TaxAccount.Taxaccountant)
router.post('/loginAccountant')

// Admin
router.post('/AdminCreateTaxpayer')
router.get('/AdminViewTaxpayer/:taxPayerId')
router.put('/AdminUpdateTaxpayer/:taxPayerId')
router.post('/loginAdmin')











module.exports = router;