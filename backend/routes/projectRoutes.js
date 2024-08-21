import express from 'express';
const router = express.Router();
import { createProject, getProject, getProjectDetails } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route("/").post(protect, createProject);
router.route("/getproject").post(protect, getProject)
router.route("/projectdetails").post(protect, getProjectDetails)

export default router;