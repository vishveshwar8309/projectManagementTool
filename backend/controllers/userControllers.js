import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js'

const registeruser = async (req, res) => {
    const { email, name, password, role } = req.body;

    const data = await User.findOne({ email });

    if (data) {
        res.status(403).json({ message: "Email already exist try to login" });
    } else {
        const user = await User.create({ email, name, password, role });
        if (user) {
            generateToken(res, user._id);

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            })
        } else {
            res.status(401).json({ message: "Invalid user Data" });
        }
    }
}

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.verifyPassword(password))) {
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            projects: user.projects
        })
    } else {
        res.status(400).json({ message: "invalid credentials" })
    }

}

const logoutUser = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "logout successful" });
}

export { registeruser, authenticateUser, logoutUser }