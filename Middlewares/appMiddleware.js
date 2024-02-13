const appMiddleware=(req,res,next)=>{
    console.log("inside middlware");
    next()
}
module.exports=appMiddleware