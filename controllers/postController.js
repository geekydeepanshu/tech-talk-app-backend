// postController.js

const postService = require('../services/postService');
const userService = require('../services/userService');
const asyncHandler = require('express-async-handler');
const postValidator = require('../validators/postValidator');

// Controller for creating a new post
const createPost = asyncHandler(async (req, res) => {
    // Validate request body using Joi
    const { error, value } = postValidator.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        // Call service to create a post
        const post = await postService.createPost(value);
        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Controller for getting all posts
const getAllPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json({ message: 'Posts retrieved successfully', posts });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Controller for getting a single post by ID
const getPostById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postService.getPostById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post retrieved successfully', post });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Controller for updating a post
const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate request body using Joi
    const { error, value } = postValidator.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const updatedPost = await postService.updatePost(id, value);
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post updated successfully', updatedPost });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});






// Controller for deleting a post
const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await postService.deletePost(id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};
