//validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {

    const schema = {

        fname: Joi.string().min(6).required(),
        lname: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        confirpwd: Joi.string(),
        phone: Joi.number().min(10).required(),
        address: Joi.string().min(6).required(),
        role: Joi.string().min(4).required(),
        

    };

    return Joi.validate(data, schema);

};





module.exports.registerValidation = registerValidation;