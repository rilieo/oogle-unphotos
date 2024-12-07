import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo', required: false}],
});

const User = mongoose.model('User', userSchema);

export default User;