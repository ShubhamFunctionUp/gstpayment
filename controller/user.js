const jwt = require('jsonwebtoken');
const userModel = require('../models/usermodels');
let States = [ "Andhra Pradesh",
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
        "Puducherry"]



const createUser = async function (req, res) {
    let data = req.body;


    if (Object.keys(data).length == 0) {
        return res.send({
            status: false,
            msg: "Please insert data"
        });
    }
try {
    

    let {
        title,
        name,
        phone,
        email,
        password,
        State,
        role,
    } = data;
   
    
    // if(body('email').isEmail())

    if (title == "" || typeof (title) == "undefined" || typeof (title) == "null") {
        return res.status(400).send({
            status: false,
            msg: "Please insert inside the title"
        })
    }
    if (name == "" || typeof (name) == "undefined" || typeof (name) == "null") {
        return res.status(400).send({
            status: false,
            msg: "Please insert inside the name"
        })
    }
    if (email == "" || typeof (email) == "undefined" || typeof (email) == "null") {
        return res.status(400).send({
            status: false,
            msg: "Please insert inside the email"
        })
    }
    if (password == "" || typeof (password) == "undefined" || typeof (password) == "null") {
        return res.status(400).send({
            status: false,
            msg: "Please insert inside the password"
        })
    }
    
    if (phone == "" || typeof (phone) == "undefined" || typeof (phone) == "null") {
        return res.status(400).send({
            status: false,
            msg: "Please insert inside the phone"
        })
    }
    if (phone.length === "10") {
        return res.status(400).send({
            msg: "Please enter 10 digit Number"
        });
    }

    if (!/^([a-z0-9\.-]+)@([a-z-]+).([a-z]+)$/.test(email)) {
        return res.status(400).send({
            msg: "Please enter valid email"
        })
    }

    if (!["Mr", "Mrs", "Miss"].includes(title)) {
        return res.status(400).send({
            status: false,
            msg: "Please insert title among Mr,Mrs or Miss"
        })
    }

    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)) {
        return res.status(400).send({
            status: false,
            msg: "Please enter Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        })
    }

    if(State=="" || typeof( State)==null){
        return res.status(400).send({msg:"Please enter valid state Name"})
    }

    if(role==null || role=="" || role==undefined ){
        return res.status(400).send({msg:"Please enter valid role"})
    }


    let emailPresent = await userModel.findOne({
        email: email
    })

    if (emailPresent != null) {
        return res.status(409).send({
            msg: "Email is already present"
        });
    }

    let phonePresent = await userModel.findOne({
        phone: phone
    })
    if (phonePresent != null) {
        return res.status(409).send({
            msg: "phonee is already present"
        });
    }

    if (!States.includes(State)) {
        return res.status(400).send({
            status: false,
            msg: "Please insert valid states name"
        })
    }

    let successFullyInserted = await userModel.create(data);
    res.status(201).send({
        status: true,
        msg: successFullyInserted
    })
}
    catch (error) {
        return res.status(500).send({msg:error.message})
    }

}

const login = async function (req, res) {

    let data = req.body;

    try{
    if (Object.keys(data).length == 0) {
        return res.status(404).send({
            status: false,
            msg: "Please insert data"
        });
    }

    let {
        email,
        password
    } = data;

    let isEmailPresent = await userModel.findOne({
        email: email,
        password: password
    });
    if (!isEmailPresent) {
        return res.status(400).send({
            status: false,
            msg: "Email and password is incorrect"
        });
    }

    let userId = isEmailPresent._id;

    let token = jwt.sign({
        userId: userId.toString(),
        project: "GSTPROJECT",
        organization: "Noida"
    }, "Shubham12");

    res.setHeader('x-auth-token', token);
    return res.status(201).send({
        status: true,
        msg: token
    });
}catch(err){
    return res.status(500).send({msg:err.message})
}

}
module.exports.login = login
module.exports.createUser = createUser;