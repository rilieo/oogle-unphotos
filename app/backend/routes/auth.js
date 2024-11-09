import bcrypt from "bcryptjs";
import express from "express";
import User from "../schemas/user.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    console.log("Signing up...");
    const body = req.body;
    const username = body.username;
    const password = body.password;

    const findByUsername = await User.find({ username: username });

    if (findByUsername.length > 0) {
        res.status(400).json({ message: "Username already exists" });
        return;
    }

    console.log("Creating user...");
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
        username: username,
        password: hashedPassword
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
        res.status(500).json({ message: "Error saving user" });
        return;
    }

    res.status(200).json(savedUser);
});

authRouter.post("/login", (req, res) => {
    console.log("Logging in...");
    console.log(req.body);
});

export { authRouter };


