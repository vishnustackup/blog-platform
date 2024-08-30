const Blog = require('../models/blogmodel')
const Users = require('../models/usermodel')


// ---------------GET ADMIN BLOG----------------//


const getEditBlog = async (req, res) => {
    const blogs = await Blog.findById(req.params.id).populate('author', 'username')
    res.render('editblog', { blogs })
}




// ---------------UPDATE ADMIN BLOG----------------//

const Updateblog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).send('Internal Server Error');
    }
};

// ---------------DELETE ADMIN BLOG----------------//

const Deleteblog = async (req, res) => {

    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.redirect('/admin/dashboard')
    } catch (error) {
        res.status(500).send('Server error');
    }

}


// ---------------GET ADMIN DASHBOARD ----------------//

const getAdminDashboard = async (req, res) => {
    try {
        const users = await Users.find();
        const blogs = await Blog.find().populate('author', 'username')

        // Render the admin dashboard view
        res.render('dashboard', {
            user: req.session.user,
            users,
            blogs
        });


    } catch (error) {
        console.error('Error fetching admin dashboard:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { Deleteblog, getAdminDashboard, getEditBlog, Updateblog }

