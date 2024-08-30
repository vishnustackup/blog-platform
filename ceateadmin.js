const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./models/usermodel')
require('dotenv').config()


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('db connected'))
    .catch(() => console.error("db not connected"))

const createadmin = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const existAdmin = await User.findOne({ role: 'admin' })
        if (existAdmin) {
            console.log('admin exist');
            return

        }


        const admin = new User({
            username: 'admin',
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin"
        })
        await admin.save()
    } catch (err) {
        console.error('admin saving failed');

    } finally {
        mongoose.connection.close()
    }
}

createadmin()