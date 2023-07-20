const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
    },
    projects: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    users: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });

const TeamModel = mongoose.model('team', TeamSchema);
module.exports = {
    TeamModel,
}