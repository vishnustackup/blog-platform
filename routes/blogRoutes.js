const express = require('express')
const router = express.Router()
const { createPost, getPost, getEditBlog, updateEditBlog, deleteBlog, getPostbyId } = require('../controllers/blogcontroller')
const authmiddleware = require('../middleware/authentication')


router.get('/addblog', (req, res) => {
    res.render('addblog')
})


router.use(authmiddleware)
router.get('/', getPost)
router.get('/home', getPost)
router.post('/', createPost)
router.get('/edit/:id', getEditBlog)
router.post('/update/:id', updateEditBlog)
router.get('/delete/:id', deleteBlog)
router.get('/myposts', authmiddleware, getPostbyId)



module.exports = router

