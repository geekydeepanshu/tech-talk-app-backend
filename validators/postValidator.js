const Joi = require('joi');

// Define the validation schema for the post
const postSchema = Joi.object({
    title: Joi.string().min(5).max(100).required().messages({
        'string.empty': 'Title is required',
        'string.min': 'Title must be at least 5 characters long',
        'string.max': 'Title cannot exceed 100 characters',
    }),
    image: Joi.string().required().messages({
        'string.empty': 'Image URL is required',
    }),
    description: Joi.string().min(10).max(10000).required().messages({
        'string.empty': 'Description is required',
        'string.min': 'Description must be at least 10 characters long',
        'string.max': 'Description cannot exceed 10000 characters',
    }),
    total_likes: Joi.number().integer().min(0).default(0).messages({
        'number.base': 'Total likes must be a number',
        'number.integer': 'Total likes must be an integer',
        'number.min': 'Total likes cannot be negative',
    }),
    comments: Joi.array().items(
        Joi.object({
            user_id: Joi.string().required().messages({
                'string.empty': 'User ID is required for the comment',
            }),
            comment: Joi.string().min(1).max(500).required().messages({
                'string.empty': 'Comment cannot be empty',
                'string.min': 'Comment must be at least 1 character long',
                'string.max': 'Comment cannot exceed 500 characters',
            }),
            createdAt: Joi.date().default(Date.now).messages({
                'date.base': 'Invalid date for comment creation',
            }),
        })
    ).messages({
        'array.base': 'Comments must be an array of comment objects',
    }),
    author: Joi.string().required().messages({
        'string.empty': 'Author is required',
    }),
});

module.exports = postSchema;
