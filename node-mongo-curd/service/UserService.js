const User = require('../models/User');

const createUser = async (data) => {
    return await User.create(data);
};

const getAllUsers = async (page, limit) => {
    const skip = (page - 1) * limit;
    const users = await User.find().skip(skip).limit(limit);
    const total = await User.countDocuments();
    return { users, total, page, limit };
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const updateUserById = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};
