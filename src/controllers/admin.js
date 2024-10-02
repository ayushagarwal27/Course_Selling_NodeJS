const express = require('express');
const Router = express.Router;
const adminRouter = Router();

adminRouter.post('/admin/signup',()=>{})
adminRouter.post('/admin/login',()=>{})
adminRouter.post('/admin/course',()=>{})
adminRouter.patch('/admin/course/:id',()=>{})
adminRouter.delete('/admin/course/:id',()=>{})


module.exports = adminRouter;