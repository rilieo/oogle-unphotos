import mongoose from 'mongoose'

mongoose.connect(process.env.DSN)

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    photos: [{type: Array, required: false}],
    rearrangedPhotos: [{type: Array, required: false}]
})

const User = mongoose.model('User', userSchema);