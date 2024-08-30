const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
const adminRoutes = require('./routes/adminRoutes')
const session = require('express-session')
app.use(session({
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}))

connectDB()


app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))



app.use('/', userRoutes)
app.use('/blog', blogRoutes)
app.use('/admin', adminRoutes)


app.listen(3000, () => {
    console.log('server is running on port 3000');

})






// mongoose.connect('mongodb://127.0.0.1:27017/blogplatform')
//     .then(() => console.log("db connected"))
//     .catch(() => console.error("cant connect"))

// const testHashing = async () => {
//     const password = '1234';
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log('Hashed Password:', hashedPassword);

//     const isMatch = await bcrypt.compare(password, hashedPassword);
//     console.log('Password Match:', isMatch); // Should be true
// };

// testHashing();