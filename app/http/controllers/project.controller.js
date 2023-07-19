const { ProjectModel } = require("../../models/project");

class ProjectController {

    async createProject(req, res, next) {
        const { title, text, image, tags } = req.body;
        const owner = req.user._id;
        const project = await ProjectModel.create({ title, text, owner, image, tags });
        if(!project) next({ status: 400, message: 'Project creation failed'})
        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Project created successfully',
            project
        });
    }

    async getAllProject(req, res, next) {
        const owner = req.user._id;
        const projects = await ProjectModel.find({ owner });
        if(!projects || projects.length == 0) return next({ status: 404, message: 'Projects related to this user not found' })
        return res.status(200).json({
            status: 200,
            success: true,
            projects
        })
    }

    getProjectByID() {

    }

    getAllProjectsOfTeam() {

    }

    getProjectsOfUser() {

    }

    updateProject() {

    }

    removeProject() {
        
    }
}

module.exports = {
    ProjectController: new ProjectController()
}