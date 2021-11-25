const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation } = require('../validation');





router.post('/register', async (req, res) => {


    //check password and confirm password is same
    if (req.body.confirpwd !== req.body.password) return res.status(400).send("password not is match");


    //Lets validate the data before we a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);




    //Checking the role of user
    const role = req.body.role;
    if (role !== 'admin' && role !== 'user') return res.status(400).send('role  is incorrect');


    //Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exsist');




    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);



    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashedPassword,
        address: req.body.address,
        phone: req.body.phone,
        role: req.body.role
    });

    try {
        const savedUser = await user.save();
        //SUCCESS RESPONSE
        res.send({ user: user._id });
        
    } catch (err) {
        res.status(400).send(err);
    }


});


//login
router.post('/login', async (req, res) => {
    //Checking if the user is already exsist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is wrong');

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    //Create and assign a token
    
    const token = jwt.sign({ _id: user._id, name: user.name }, process.env.TOKEN_KEY, { expiresIn: "12000s" });
  



    try {
      
        //SUCCESS RESPONSE
        res.send({
            user: user._id,
            message: "authentication is succesful",
            status: 200,
            token
        });

    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = router;