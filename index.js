//Loads .env file contents into process.env by default.
require('dotenv').config()

//import express
const express =require('express')

//import cors
const cors =require('cors')
//import route
const router =require('./Router/route')
//db connection import
const db=require('./DB/connection')

//application middlware import
const appMiddleware=require("./Middlewares/appMiddleware")
const jwtMiddleware=require("./Middlewares/jwtMiddleware")
//create a backend server using express
const pfServer=express()
//use
pfServer.use(cors())
pfServer.use(express.json())//Returns midddleware that only parses json
// pfServer.use(appMiddleware)
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads')) //to export image from server to client

//port creation
const PORT= 4000 || process.env.PORT

//server listen
pfServer.listen(PORT,()=>{
    console.log('Listening on port ' +PORT);
})

//http=get resolving to http :// localhost/4000
pfServer.get("/",(req,res)=>{
res.send('<h1>Project Fair is started</h1>')
})