const { ProjectModel } = require("../../models/project");

class ProjectController {
    async createProject(req, res, next) {
        const { title, text } = req.body;
        const owner = req.user._id;
        const project = await ProjectModel.create({ title, text, owner});
        if(!project) next({ status: 400, message: 'Project creation failed'})
        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Project created successfully',
            project
        });
    }

    getAllProject() {

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