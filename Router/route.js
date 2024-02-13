//import express
const express =require('express')
const userController=require('../Controllers/userController')
const projectController=require('../Controllers/projectController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const multerConfig=require('../Middlewares/multerMiddlware')
//create a router object  of express to define routes (paths)
const router =new express.Router()
//using router  object to define paths

//1 Register APi routes-localhost:4000/register
router.post('/register',userController.register)

//2 Register APi routes-localhost:4000/login
router.post('/login',userController.login)

//3 Add user project API  routes-localhost:4000/projects/add
router.post('/projects/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)


//4 Get user project API  routes-localhost:4000/projects/all-user-projects
router.get('/projects/all-user-projects',jwtMiddleware,projectController.getUserProject)


//5 Get All Projects API  routes-localhost:4000/projects/all-projects
router.get('/projects/all-projects',jwtMiddleware,projectController.getAllProjects)

//6 Get Home page Projects API routes-localhost:4000/projects/home-projects
router.get('/projects/home-projects',projectController.getHomeProjects)

//7 update project routes localhost:4000/projects/update-projects/id
router.put('/projects/update-projects/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.edituserProjects)
//8 delete project routes localhost:4000/projects/delete-projects/id
router.delete('/projects/delete-projects/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.deleteProjects)

module.exports=router