import express from "express";
import { addRemoveFriend, getUser, getUserFriends, searchUser } from "../controllers/user.js";
import { verifyToken } from "../midleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, searchUser)
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.post("/addRemove/:id", verifyToken, addRemoveFriend);

export default router;
