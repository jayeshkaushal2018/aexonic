const router = require("express").Router();
const User = require('../model/User');
const { verifyToken} = require("../middle/verifyToken");



//All users
router.get("/users",verifyToken,async (req,res)=>{

    try{
   
        const pagination = req.query.pagination
        ? parseInt(req.query.pagination)
        :2;
        const page = req.query.page ? parseInt(req.query.page):1;
        const data = await User.find()
        .skip((page -1) * pagination)
        .limit(pagination);
    
        res.status(200).json(data);

    }catch(err){
        res.status(500).json(err)
    }
})



//get user by id
router.get("/user/:id",verifyToken,async (req,res)=>{
   

    try{
        // Checking if the user is already in the database
       const userData = await User.findOne({ _id: req.params.id });

    if (!userData) return res.status(400).send('Product does not exsist');
        
        res.status(200).json(userData);

    }catch(err){
        res.status(500).json(err)
    }
})


//get user by id
router.put("/user",verifyToken,async (req,res)=>{
   

    try{
        User.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, doc) => {
            try {
    
                //SUCCESS RESPONSE
                res.send({ user_id: req.body.id });
        
            } catch (err) {
                res.status(400).send(err);
            }
        
            
        }).lean();

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;