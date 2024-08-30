const mongoose = require('mongoose')
const User = require('./usermodel')
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: User,
        required: true// Author is required
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

const Blog = mongoose.model('blog', blogSchema)
module.exports = Blog