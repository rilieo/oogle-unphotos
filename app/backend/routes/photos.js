import express from "express";
import Photo from "../schemas/photo.js";
import User from "../schemas/user.js";

const photosRouter = express.Router();

const getPhotos = async (user) => {
    const savedPhotos = [];
    for (let i = 0; i < user.photos.length; i++) {
        const photo = await Photo.findById(user.photos[i]);
        savedPhotos.push(photo);
    }
    return savedPhotos;
}

photosRouter.get("/", async (req, res) => {
    const user = req.query.user;
    const findUser = await User.find({ username: user });
    const currUser = findUser[0];

    if (!currUser) {
        res.status(400).json({ message: "User not found" });
        return;
    }

    const savedPhotos = await getPhotos(currUser);

    res.status(200).json({ photos: savedPhotos });
});

photosRouter.post("/upload", async (req, res) => {
    const body = req.body;
    const file = body.file;
    const userToUpdate = body.user;

    if (!file) {
        res.status(400).json({ message: "No file found" });
        return;
    }

    const findUser = await User.find({ username: userToUpdate });
    const currUser = findUser[0];

    if (!currUser) {
        res.status(400).json({ message: "User not found" });
        return;
    }

    const newPhoto = new Photo({
        image: file
    });

    const savedPhoto = await newPhoto.save();

    if (!savedPhoto) {
        res.status(500).json({ message: "Error saving photo" });
        return;
    }

    currUser.photos.push(savedPhoto._id);

    const savedUser = await currUser.save();
    
    if (!savedUser) {
        res.status(500).json({ message: "Error saving user" });
        return;
    }

    const savedPhotos = await getPhotos(savedUser);

    res.status(200).json({ photos: savedPhotos });
});

export { photosRouter };