const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            minlength: [5, 'Title must be at least 5 characters long'],
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        image: {
            type: String,
            required: [true, 'Image URL is required'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minlength: [10, 'Description must be at least 10 characters long'],
            maxlength: [10000, 'Description cannot be more than 1000 characters'],
        },
        total_likes: {
            type: Number,
            default: 0, // Initialize with 0
        },
        comments: [
            {
                user_id: {
                    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
                    ref: 'User', // Assuming you have a User model
                    required: true,
                },
                comment: {
                    type: String,
                    required: [true, 'Comment cannot be empty'],
                    minlength: [1, 'Comment must be at least 1 character long'],
                    maxlength: [1000, 'Comment cannot exceed 1000 characters'],
                },
                createdAt: {
                    type: Date,
                    default: Date.now, // Timestamp for each comment
                },
            },
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the User model
            ref: 'User', // Assuming you have a User model
            required: [true, 'Author is required'],
        },

    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Post', postSchema);
