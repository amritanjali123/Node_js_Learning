const Joi = require("joi")
module.exports = {
    signupValidation:  function (data) {
        const Schema = Joi.object({
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().min(5).max(12).required(),
            add:Joi.object({
                firstName:Joi.string().required(),
                lastName:Joi.string().required()
            }).required()
        })

        const xyz = Joi.validate(data, Schema, { abortEarly: false, stripUnknown: true });
        if (xyz.error) return {
            error: xyz.error,
            data: null
        }; return {
            error: null,
            data: xyz.value
        }



    }
}