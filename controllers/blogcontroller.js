const Blog = require('../models/blogmodel')




// --------------- CREATE BLOG ------------------//

const createPost = async (req, res) => {

    const { title, content } = req.body;
    const author = req.session.user._id
    try {
        const newPost = await new Blog({
            title,
            content,
            author
        })

        await newPost.save()
        res.redirect('/blog')
    } catch (err) {
        console.error(err);

    }
}

// --------------- GET BLOG BY ID----------------//

const getPostbyId = async (req, res) => {
    try {

        const Userid = req.session.user._id;
        const users = req.session.user


        const posts = await Blog.find({ author: Userid })
        res.render('myposts', { posts, users })
    } catch (error) {
        console.log(error);

    }


}


// --------------- GET BLOG----------------//

const getPost = async (req, res) => {

    try {
        const user = req.session.user
        const blogs = await Blog.find().sort({ createdAt: -1 }).populate('author', 'username')
        res.render('home', { blogs, user })
    } catch (error) {
        console.log(error);

    }

}


// ---------------GET  UPDATE BLOG----------------//

const getEditBlog = async (req, res) => {

    const blog = await Blog.findById(req.params.id).lean();
    if (!blog) {
        return res.status(400).json({
            msg: "user not found"
        })
    }

    res.render('updateblog', { blog })

}




// ---------------UPDATE BLOG----------------//

const updateEditBlog = async (req, res) => {
    const { title, content } = req.body;
    try {

        const updateblog = await Blog.findByIdAndUpdate(req.params.id,
            { title, content },
            { new: true }
        )
        if (!updateblog) {
            return res.status(400).json({
                msg: "blog not found"
            })
        }
        res.redirect('/blog/myposts')

    } catch (err) {

    }
}



// ---------------DELETE BLOG----------------//

const deleteBlog = async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id)

    if (!blog) {
        return res.status(400).json({
            msg: "blog not found"
        })
    }
    res.redirect('/blog/myposts')
}

module.exports = { createPost, getPost, getEditBlog, updateEditBlog, deleteBlog, getPostbyId, }