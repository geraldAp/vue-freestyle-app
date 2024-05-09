const Joi = require('joi')


const validateUserCredentials = (email, password) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
            .messages({
                'string.email': 'Please enter a valid email address',
                'string.empty': 'Email is required',
                'any.required': 'Email is required'
            }),

        password: Joi.string()
            .min(6) // Example: Minimum 6 characters
            .required()
            .messages({
                'string.empty': 'Password is required',
                'any.required': 'Password is required',
                'string.min': 'Password must be at least 6 characters long'
            })
    });

    const { error, value } = schema.validate({ email, password }, { abortEarly: false });
    
    return {
        email: {
            value: value.email,
            error: error && error.details.find(detail => detail.context.key === "email")
        },
        password: {
            value: value.password,
            error: error && error.details.find(detail => detail.context.key === "password")
        }
    };
};

module.exports = validateUserCredentials