const { ProjectModel } = require("../../models/project");
const { createLink } = require("../../modules/createLink");

class ProjectController {

    createProject = async (req, res, next) => {
        const { title, text, image, tags } = req.body;
        const owner = req.user._id;
        const project = await ProjectModel.create({ title, text, owner, image, tags });
        if(!project) next({ status: 400, message: 'Project creation failed'});
        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Project created successfully',
            project
        });
    }

    getAllProject = async (req, res, next) => {
        const owner = req.user._id;
        const projects = await ProjectModel.find({ owner });
        if(!projects || projects.length == 0) return next({ status: 404, message: 'Projects related to this user not found' });
        for (const project of projects) {
            project.image = createLink(req, project.image);
        }
        return res.status(200).json({
            status: 200,
            success: true,
            projects
        })
    }

    getProjectByID = async (req, res, next) => {
        const owner = req.user._id;
        const projectId = req.params.id;
        const project = await ProjectModel.findOne({ owner, _id: projectId });
        project.image = createLink(req, project.image);
        if(!project) return next({ status: 404, message: 'Project with this id which related to this user not found' });
        return res.status(200).json({
            status: 200,
            success: true,
            project
        })
    }

    removeProject = async (req, res, next) => {
        const owner = req.user._id;
        const projectId = req.params.id;
        const deleteProjectResult = await ProjectModel.findOneAndDelete({ owner, _id: projectId });
        if(!deleteProjectResult) return next({ status: 404, message: 'Project with this id which related to this user not found' });
        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Project deleted successfully',
            project: {
                title: deleteProjectResult.title,
                id: deleteProjectResult._id,
                text: deleteProjectResult.text
            }
        })
        
    }

    updateProject = async (req, res, next) => {
        const projectId = req.params.id;
        const owner = req.user._id;
        const data = { ...req.body };
        Object.entries(data).forEach(([key, value]) => {
            if(!['title', 'text', 'tags'].includes(key)) delete data[key];
            if(['', ' ', 0, null, undefined, NaN].includes(value)) delete data[key];            
            if(key == 'tags' && Array.isArray(data['tags'])) { // or: data['tags].constructor === Array
                data['tags'] = data['tags'].filter(item => {
                    if (!['', ' ', 0, null, undefined, NaN].includes(item.trim())) return item;
                })
                if (data['tags'].length == 0) delete data['tags'];
            }
        });
        const updateResult = await ProjectModel.findOneAndUpdate({ owner, _id: projectId } , { $set: data });
        if(!updateResult) return next({ status: 404, message: 'Project not found'});
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Project updated successfully'
        })
    }

    async updateProjectImage(req, res, next) {
        const projectId = req.params.id;
        const { image } = req.body;
        const owner = req.user._id;
        const updatedProject = await ProjectModel.findOneAndUpdate({ owner, _id: projectId}, { $set: { image }}, { new: true });
        if(!updatedProject) return next({ status: 404, message: 'Project not found'});
        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Update project image successfully',
            updatedProject
        })
    }

    getAllProjectsOfTeam() {

    }

    getProjectsOfUser() {

    }
}

module.exports = {
    ProjectController: new ProjectController()
}