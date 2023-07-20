const { TeamModel } = require("../../models/team");

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
        const teams = await TeamModel.find({
            $or: [
                {owner : userId},
                {users: userId}
            ]
        });
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
}

module.exports = {
    TeamController: new TeamController()
};