import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js'
import { createTask, getATask, getTasks, updateTask } from '../controllers/taskController.js';

router.route("/create").post(protect, createTask)
router.route("/updatetask").put(protect, updateTask)
router.route("/:taskId").get(protect, getATask)
router.route("/:employeeId/:projectId").get(protect, getTasks);


export default router;