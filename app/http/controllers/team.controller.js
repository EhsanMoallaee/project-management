const { TeamModel } = require("../../models/team");
const { UserModel } = require("../../models/user");
const { idValidator } = require("../validations/id.validator");

class TeamController {

    createTeam = async (req, res, next) => {
        const { name, description, username } = req.body;
        const owner = req.user._id;
        const team = await TeamModel.create({name, description, owner, username});
        if(!team) return next({status: 500, message: 'Team creation failed'});
        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Team created successfully',
            team
        })
    }

    getAllTeams = async(req, res, next) => {
        const teams = await TeamModel.find();
        return res.status(200).json({
            status: 200,
            success: true,
            teams
        })
    }

    getTeamById = async(req, res, next) => {
        const teamId = req.params.id;
        const team = await TeamModel.findById(teamId);
        if(!team) return next({status: 404, message: 'Team not found'})
        return res.status(200).json({
            status: 200,
            success: true,
            team
        })
    }

    getMyTeams = async(req, res, next) => {
        const userId = req.user._id;
        const teams = await TeamModel.aggregate([
            { 
                $match: { 
                    $or: [ {owner : userId}, {users: userId} ]
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'owner',
                    foreignField: '_id',
                    as: 'owner'
                }
            },
            {
                $project: {
                    '_id': 0,
                    'name': 1,
                    'description': 1,
                    'projects': 1,
                    'users': 1,
                    'owner.username': 1,
                    'owner.mobile': 1,
                    'owner.email': 1
                }
            },
            {
                $unwind: '$owner'
            }
        ]);

        if(!teams || teams.length == 0) return next({status: 404, message: 'Teams not found'})
        return res.status(200).json({
            status: 200,
            success: true,
            teams
        })
    }

    removeTeam = async (req, res, next) => {
        const teamId = req.params.id;
        const owner = req.user._id;
        const deleteTeamResult = await TeamModel.findOneAndDelete({ owner, _id: teamId });
        if(!deleteTeamResult) return next({status: 404, message: 'Team with this specifications not found'});
        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Team deleted successfully'
        })
    }

    inviteUserToTeam = async(req, res, next) => {
        const { username, teamId } = req.params;
        const userId = req.user._id;
        const team = await TeamModel.findOne({
            _id: teamId,
            $or: [ { owner: userId }, { users: userId }]
        });
        if(!team) return next({ status: 404, message: 'Invitation team not found'});
        let user = await UserModel.findOne({username});
        if(!user) return next({ status: 404, message: 'Invited user not found'});
        if(user._id.equals(userId)) return next({ status: 403, message: 'You can\'t invite yourself to a team'});
        const isAlreadyInvited = !!(user.invitations).find(item => item.teamId == teamId);
        if(isAlreadyInvited) {
            return next({ status: 400, message: 'This user has invited to this team before'});
        }
        const invitation = {
            teamId,
            inviter: userId.username
        }
        user.invitations.push(invitation);
        user = await user.save();
        return res.status(200).json({
            status: 200,
            success: true,
            message: 'User invite request sent successfully'
        })
    }

    updateTeam = async (req, res, next) => {
        const data = req.body;
        const userId = req.user._id;
        const teamId = req.params.id;
        Object.keys(data).forEach(key => {
            data[key] = data[key].trim()
            if(!data[key] || data[key].length == 0) delete data[key];
            if(['', ' ', undefined, null, NaN].includes(data[key])) delete data[key];
        });
        const team = await TeamModel.findOneAndUpdate(
            { _id: teamId, owner: userId },
            { $set: data},
            { new: true }
        );
        if(!team) return next({status: 404, message: 'Team not found'})
        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Team updated successfully'
        })
    }
}

module.exports = {
    TeamController: new TeamController()
};