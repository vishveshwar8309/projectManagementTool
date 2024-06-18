import Project from '../models/projectModel.js';
import User from '../models/userModel.js';

const createProject = async (req, res) => {
    const { title, description, teamMembers, startDate, endDate } = req.body;

    try {

        const members = await User.find({ name: { $in: teamMembers } });
        if (members.length !== teamMembers.length) {
            res.status(404).json({ message: "Some team members not found" })
        }

        const manager = await User.findById({ _id: req.user._id })
        if (!manager) {
            return res.status(404).json({ message: "Project manager not found" });
        }

        const newProject = new Project({ title, description, projectManager: manager._id, startDate, endDate });

        if (newProject) {

            // mapping team members documents to add id of newly created project 
            // & saving the team members id to the project document

            const savePromises = members.map(async (member) => {
                newProject.teamMembers.push(member._id)
                member.projects.push(newProject._id)
                return member.save()
            })

            await Promise.all(savePromises)

            //adding projects id to managers document
            manager.projects.push(newProject._id);
            await manager.save();

            const resp = await newProject.save()

            res.status(201).json(resp);

        } else {
            res.status(400).json({ message: "error creating project" })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }


}

const getProjectDetails = async (req, res) => {
    const projectIds = req.body;
    try {
        const projectsDetails = await Project.find({ _id: { $in: projectIds } });

        if (projectsDetails.length !== 0) {
            res.status(200).json(projectsDetails)
        } else {
            res.status(404).json({ message: "No Projects Found" })
        }

    } catch (err) {
        res.status(500).json("Server error")
    }

}
export { createProject, getProjectDetails }