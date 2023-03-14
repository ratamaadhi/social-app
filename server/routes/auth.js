import express from "express";
import { login } from "../controllers/auth.js";
import { validatorLogin } from "../midleware/auth.js";

const router = express.Router();

router.post("/login", validatorLogin, login);

export default router;