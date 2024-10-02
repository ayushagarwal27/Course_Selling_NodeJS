const express = require('express');
const connectDB  = require('./config/database');

const app = express();
const userRouter = require('./controllers/user')
const adminRouter = require('./controllers/admin')
const courseRouter = require('./controllers/course')

app.use(express.json());

app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/course', courseRouter)

connectDB().then(()=>{
    console.log('Connected to db');
    app.listen(3000, ()=>{
        console.log('Listening on port: '+3000)
    })
}).catch(err => {
    console.log('An error occurred while connecting db');
})


