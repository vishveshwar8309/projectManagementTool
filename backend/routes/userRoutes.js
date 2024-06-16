import express from 'express'
const router = express.Router();
import { registeruser } from '../controllers/userControllers.js';

// router.route("/signin")
router.route("/register").post(registeruser);

export default router;