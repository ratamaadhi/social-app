import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const userObj = { ...user._doc };
        delete userObj.password;
        res.status(200).json(userObj);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const searchUser = async (req, res) => {
    try {
        const { search: searchQuery } = req.query;
        if (!searchQuery)
            return res.status(404).json({ msg: "User does not found. " });

        const userList = await User.find({
            $or: [
                {
                    firstName: new RegExp(searchQuery, "i"),
                },
                {
                    lastName: new RegExp(searchQuery, "i"),
                },
                {
                    email: new RegExp(searchQuery, "i"),
                },
            ],
        });
        if (userList.length <= 0)
            return res.status(404).json({ msg: "User does not found. " });

        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export function createFriendObj(userObj) {
    return {
        _id: userObj._id,
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        picturePath: userObj.picturePath,
        occupation: userObj.occupation,
        location: userObj.location,
    };
}

export const addRemoveFriend = async (req, res) => {
    try {
        const friendId = req.params.id;
        const userId = req.user.id;

        if (!userId) return res.status(300).json("Undefined user id");
        if (!friendId) return res.status(300).json("Undefined friend id");

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((uf) => uf !== friendId);
            friend.friends = friend.friends.filter((ff) => ff !== userId);
        } else {
            user.friends.push(friendId);
            friend.friends.push(userId);
        }

        user.save();
        friend.save();

        const friends = await Promise.all(
            user.friends.map((ufId) => User.findById(ufId))
        );

        const formatFriendObj = friends.map((fr) => {
            return createFriendObj(fr);
        });

        res.status(200).json(formatFriendObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(300).json("Undefined user id");
        const user = await User.findById(id);
        const getFriends = await Promise.all(
            user.friends.map((fId) => User.findById(fId))
        );
        const formatFriendObj = getFriends.map((fr) => createFriendObj(fr));
        res.status(200).json(formatFriendObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
