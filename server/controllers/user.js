import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const userObj = { ...user._doc };
        delete userObj.password;
        res.status(200).json(userObj);
    } catch (error) {
        res.status(404).json({ message: err.message });
    }
};
