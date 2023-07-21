const { UserModel } = require("../../models/user");
const { createLink } = require("../../modules/createLink");

class UserController {

    getProfile(req, res, next) {
        const user = req.user;
        user.profile_image = createLink(req, user.profile_image);
        if(!user) return next({status: 404, message: 'User not found!'});
        return res.status(200).json({
            status: 200,
            success: true,
            user
        });
    }

    getAllInvitations = async (req, res, next) => {
        const userId = req.user._id;
        const {invitations} = await UserModel.findById(userId).select({invitations: 1, _id: 0});
        if(!invitations || invitations.length == 0) return next({status: 404, message: 'You haven\'t any invitation'});
        return res.status(200).json({
            status: 200,
            success: true,
            invitations
        })
    }

    getInvitationsByStatus = async (req, res, next) => {
        const userId = req.user._id;
        const {status} = req.params;
        const aggregateCondition = [
            { $match: {_id: userId} },
            { $project: { 
                invitations: 1,
                 _id: 0,
                 invitations: {
                    $filter: {
                        input: '$invitations',
                        as: 'invitation',
                        cond: {
                            $eq: ['$$invitation.status', status]
                        }
                    }
                 }
                }
            },
        ];
        const searchResult = await UserModel.aggregate(aggregateCondition);
        const invitations = searchResult?.[0]?.invitations || undefined;
        if(!invitations || invitations.length == 0) return next({status: 404, message: 'You haven\'t any invitation'});
        return res.status(200).json({
            status: 200,
            success: true,
            invitations
        })
    }

    acceptOrRejectInvitation = async(req, res, next) => {
        const userId = req.user._id;
        const {invitationId, newStatus} = req.params;
        if(!['accepted', 'rejected'].includes(newStatus)) return next({ status: 400, message: 'New status is wrong' });
        const invitation = await UserModel.findOneAndUpdate(
            { _id: userId, invitations : { $elemMatch: {_id: invitationId, status : 'pending' } }},
            { $set: { 'invitations.$.status': newStatus }},
            { new: true }
        );
        if(!invitation) return next({status: 404, message: 'Invitation with pending status not found!'});
        return res.status(201).json({
            status: 201,
            success: true,
            message: `This invitation status successfully changed to ${newStatus}`
        })
    }

    async editProfile(req, res, next) {
        const userId = req.user._id;
        let data = req.body;
        let fields = ['first_name', 'last_name', 'skills'];
        let badValues = ['', ' ', null, undefined, NaN, 0, -1, Number];
        Object.entries(data).forEach(([key, value]) => {
            if(!fields.includes(key)) {
                delete data[key];
            }
            if(badValues.includes(value)) {
                delete data[key];
            }
        })
        if(Object.keys(data).length > 0) {
            const updateResult = await UserModel.updateOne({_id: userId}, {$set: data});
            if(updateResult.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: 'User profile updated successfully'
                })
            } else {
                return next({status: 400, message: 'Update user profile failed!'});
            }
        }
        return next({status: 400, message: 'Wrong data for update profile'})
    }

    async uploadProfileImage(req, res, next) {
        if(Object.keys(req.file).length == 0) {
            return next({status: 400, message: 'Please select and upload an image file'});
        }
        const userId = req.user._id;
        const filePath = req.file?.path?.substring(7);
        const result = await UserModel.updateOne({ _id: userId}, {$set: { profile_image: filePath }});
        if(result.modifiedCount == 0) {
            return next({status: 400, message: 'Failed to update user profile image!'});
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: 'User profile image updated successfully'
        })
        res.send('ok')
    }
}

module.exports = {
    UserController: new UserController()
}