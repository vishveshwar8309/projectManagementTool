import express from 'express'
const router = express.Router();
import { logoutUser, registeruser, authenticateUser } from '../controllers/userControllers.js';

router.route("/signin").post(authenticateUser)
router.route("/register").post(registeruser);
router.route("/logout").post(logoutUser)

export default router;