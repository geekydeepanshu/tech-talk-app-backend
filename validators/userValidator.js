const Joi = require('joi');

// Schema for user registration
const registerUserSchema = Joi.object({
    first_name: Joi.string().min(2).max(30).required().messages({
        'string.empty': 'First name is required',
        'string.min': 'First name must be at least 2 characters long',
        'string.max': 'First name cannot exceed 30 characters'
    }),
    last_name: Joi.string().allow("").max(30).messages({
        'string.max': 'Last name cannot exceed 30 characters'
    }),
    username: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Username is required',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username cannot exceed 30 characters'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long'
    }),
});

// Schema for user login
const loginUserSchema = Joi.object({
    username: Joi.string().min(3).max(30).messages({
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username cannot exceed 30 characters'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long'
    }),
});

module.exports = {
    registerUserSchema,
    loginUserSchema
};
