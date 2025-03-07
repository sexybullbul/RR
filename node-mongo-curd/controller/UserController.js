const userService = require('../service/UserService');

const createUser = async (req, res, next) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400);
        next(err);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const result = await userService.getAllUsers(Number(page), Number(limit));
        res.status(200).json(result);
    } catch (err) {
        res.status(500);
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500);
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await userService.updateUserById(req.params.id, req.body);
        if (!updatedUser) {
            res.status(404);
            throw new Error('User not found');
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400);
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await userService.deleteUserById(req.params.id);
        if (!deletedUser) {
            res.status(404);
            throw new Error('User not found');
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500);
        next(err);
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
