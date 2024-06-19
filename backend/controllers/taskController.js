import Task from "../models/taskModel.js";
import User from "../models/userModel.js"

const createTask = async (req, res) => {
    const { taskName, dueDate, status, projectId } = req.body;
    try {
        const createdTask = await Task.create({
            taskName,
            dueDate,
            status,
            employee: req.user._id,
            project: projectId,
        });

        const user = await User.findById(req.user._id).select('-password');
        user.task.push(createdTask._id)
        const updatedUser = await user.save();

        const resp = [updatedUser, createdTask];

        res.status(201).json(resp)
    } catch (err) {
        res.status(500).json({ message: "An error has been occured at serevr" })
    }
}

const getTasks = async (req, res) => {
    const { employeeId, projectId } = req.params;
    try {
        const tasks = await Task.find({ employee: employeeId, project: projectId });
        if (tasks) {
            res.status(200).json(tasks);
        } else {
            res.status(404).json({ message: "Tasks not found" })
        }
    } catch (err) {
        res.status(500).json({ messgae: "server Error" })
    }
}

const getATask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId);

        if (task) {
            res.status(200).json(task)
        } else {
            res.status(404).json({ message: "Task not found" })
        }

    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
}

const updateTask = async (req, res) => {
    const { taskId, taskName, dueDate, status } = req.body;

    const task = await Task.findById(taskId);
    if (task) {
        task.taskName = taskName || task.taskName;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status
        const updatedTask = task.save();

        res.status(200).json(task)

    } else {
        res.status(404).json({ message: "Task not found" });
    }

}

export { createTask, getTasks, getATask, updateTask }