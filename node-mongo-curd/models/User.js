const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'], 
        minlength: [3, 'Name must be at least 3 characters long'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    age: { 
        type: Number, 
        min: [18, 'Age must be at least 18'],
        max: [100, 'Age must be under 100'] 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
