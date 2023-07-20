const mongoose = require('mongoose');

const InvitationsSchema = new mongoose.Schema({
    teamId: { type: mongoose.Types.ObjectId },
    inviter: { type:String },
    request_date: { type: Date, default: new Date() },
    status: { type: String, enum : ['pending' , 'accepted' , 'rejected'], default: 'pending' }
});

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
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
    invitations: [ InvitationsSchema ],
    token: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const UserModel = mongoose.model('user', UserSchema);
module.exports = {
    UserModel,
}