import express from 'express';
const router = express.Router();
import { createProject, getProjectDetails } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route("/").post(protect, createProject);
router.route("/projects").post(protect, getProjectDetails)

export default router;