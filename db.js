import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    photos: [{type: Array, required: false}]
})

const User = mongoose.model('User', userSchema);

export { User }