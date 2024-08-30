const express = require('express')
const router = express.Router()
const admincontroller = require('../controllers/admincontroller')
const adminMiddleware = require('../middleware/adminmiddleware')

router.get('/dashboard', adminMiddleware, admincontroller.getAdminDashboard);

router.get('/edit/:id', adminMiddleware, admincontroller.getEditBlog)

router.post('/edit/:id', adminMiddleware, admincontroller.Updateblog)

router.get('/delete/:id', adminMiddleware, admincontroller.Deleteblog)

module.exports = router