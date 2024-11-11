// postService.js

const Post = require('../models/postModel');

// Function to create a new post
const createPost = async (postData) => {
    try {
        const post = new Post(postData);
        return await post.save();
    } catch (error) {
        throw new Error('Error creating post: ' + error.message);
    }
};

// Function to get all posts
const getAllPosts = async () => {
    try {
        return await Post.find().populate('author', 'username email');
    } catch (error) {
        throw new Error('Error fetching posts: ' + error.message);
    }
};

// Function to get a post by ID
const getPostById = async (postId) => {
    try {
        const post = await Post.findById(postId).populate('author', '_id username ');
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    } catch (error) {
        throw new Error('Error fetching post: ' + error.message);
    }
};

// Function to update a post
const updatePost = async (postId, updateData) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, updateData, { new: true });
        if (!updatedPost) {
            throw new Error('Post not found');
        }
        return updatedPost;
    } catch (error) {
        throw new Error('Error updating post: ' + error.message);
    }
};


// Function to add comment on post 
const addComment = async (postId, comment) => {
    try {
        const addComment = await Post.updateOne({ _id: postId },
            {
                $set: {

                }
            })
    } catch (error) {
        throw new Error('Error adding comment: ' + error.message)
    }
}


// Function to delete a post
const deletePost = async (postId) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            throw new Error('Post not found');
        }
        return deletedPost;
    } catch (error) {
        throw new Error('Error deleting post: ' + error.message);
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};
