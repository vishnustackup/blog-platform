const express = require('express')
const router = express.Router()
const userController = require('../controllers/usercontroller')


router.get('/register', userController.getUser)
router.post('/register', userController.registerUser)


router.get('/login', (req, res) => {
    res.render('login');
});


router.post('/login', userController.loginUser)

router.get('/logout', userController.logOut)


module.exports = router