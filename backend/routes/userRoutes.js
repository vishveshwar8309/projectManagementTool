import express from 'express'
const router = express.Router();
import { logoutUser, registeruser, authenticateUser, getEmployersData } from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js'

router.route("/signin").post(authenticateUser)
router.route("/register").post(registeruser);
router.route("/logout").post(logoutUser)
router.route("/employee").post(protect, getEmployersData)

export default router;