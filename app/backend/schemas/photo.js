import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    image: {type: String, required: true},
});

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;