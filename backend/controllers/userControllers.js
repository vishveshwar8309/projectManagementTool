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

export { registeruser }