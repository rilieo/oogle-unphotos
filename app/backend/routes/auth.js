import bcrypt from "bcryptjs";
import express from "express";
import User from "../schemas/user.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;

    const findByUsername = await User.find({ username: username });

    if (findByUsername.length > 0) {
        res.status(400).json({ message: "Username already exists" });
        return;
    }

    if (!username || !password) {
        res.status(400).json({ message: "Please fill out all fields" });
        return;
    }

    if (password.length < 6) {
        res.status(400).json({ message: "Password must be at least 6 characters" });
        return;
    }

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

authRouter.post("/login", async (req, res) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;

    const user = await User.find({ username: username });

    if (user.length === 0) {
        res.status(400).json({ message: "User not found" });
        return;
    }

    const passwordMatch = bcrypt.compareSync(password, user[0].password);

    if (!passwordMatch) {
        res.status(400).json({ message: "Invalid password" });
        return;
    }

    res.status(200).json(user[0]);
});

export { authRouter };


