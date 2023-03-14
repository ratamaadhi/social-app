import jwt from "jsonwebtoken";
import { validateLoginData, validateRegisterData } from "../util/validators.js";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const validatorRegister = async (req, res, next) => {
    try {
        const formRegister = req.body;
        const { errors: errs, valid } = validateRegisterData(formRegister);
        if (!valid) return res.status(400).json(errs);
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const validatorLogin = async (req, res, next) => {
    try {
        const formLogin = req.body;
        const { errors: errs, valid } = validateLoginData(formLogin);
        if (!valid) return res.status(400).json(errs);
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
