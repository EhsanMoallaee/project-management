const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    mobile: {
        type: String,
        unique: true,
        required: true,
    },
    profile_image: {
        type: String,
        unique: true,
        sparse: true
    },
    skills: {
        type: [String],
        default: [],
    },
    roles: {
        type: [String],
        default: ['User']
    },
    password: {
        type: String,
        required: true,
    },
    teams: {
        type: [mongoose.Types.ObjectId],
        default: [],
    },
    token: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const UserModel = mongoose.model('user', UserSchema);
module.exports = {
    UserModel,
}