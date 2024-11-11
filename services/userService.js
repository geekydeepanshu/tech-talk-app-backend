const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

// Register a new user
const registerUser = async ({first_name,last_name,username,email,password}) => {
    // Check if user already exists
    const isUserEmailExists = await User.findOne({email});
    if (isUserEmailExists) {
        throw new Error('User Email already exists');
    }
    const isUsernameExists = await User.findOne({username});
    if (isUsernameExists) {
        throw new Error('Username already exists');
    }

    // Create a new user and save it to the database
    const user = new User({
        first_name,
        last_name,
        username,
        email,
        password
    });

    // Save the user
    const savedUser = await user.save();
    // Return user data along with generated token
    return {
        _id:savedUser._id,
        fName:savedUser.first_name,
        lName:savedUser.last_name,
        username:savedUser.username,
        email:savedUser.email,
        token: generateToken(savedUser._id), // Generate JWT token
    };
};

// Login a user
const loginUser = asyncHandler(async ({username, password}) => {
    const  user = await User.findOne({ $or: [{ email: username }, { username: username }] });
    if (user && (await bcrypt.compare(password, user.password))) {
        // Generate a JWT token
        const token = generateToken(user._id);
        return { 
            _id:user._id,
            fName:user.first_name,
            lName:user.last_name,
            username:user.username,
            email:user.email,
            token
        } ;
    } else {
        throw new Error('Invalid email or password');
    }
});

// Find a user by ID
const getUserById = asyncHandler(async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});

// Get all users
const getAllUsers = asyncHandler(async () => {
    const users = await User.find().select('-password'); // Exclude password field
    return users;
});

// Update a user by ID
const updateUser = asyncHandler(async (userId, updateData) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    // Update fields if they exist in the updateData
    if (updateData.username) user.username = updateData.username;
    if (updateData.email) user.email = updateData.email;

    // If password needs to be updated, hash the new password
    if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(updateData.password, salt);
    }

    const updatedUser = await user.save();

    // Return updated user details
    return {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
    };
});

// Delete a user by ID
const deleteUser = asyncHandler(async (userId) => {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        throw new Error('User not found');
    }

    // Return the deleted user (optional, you can just return success message if needed)
    return user;
});

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
};
