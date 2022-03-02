const Joi = require('joi');


// Register Validation

const registerValidation = (data)=>{

    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };

   return Joi.validate(data,schema);
}

const loginValidation = (data)=>{

    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
``
   return  Joi.validate(data,schema);

}


module.exports.registerValidation = registerValidation;
// we might have another validation with two field
// loginvalidation ->email and password

module.exports.loginValidation = loginValidation;
