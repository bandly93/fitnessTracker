import express from 'express'
import passport from 'passport';
const authRouter = express();

authRouter.get('/user',(req,res,next)=>{
	


})





authRouter.post('/login',(req,res,next) =>{
	
	

})


authRouter.post('/register', (req,res,next) => {
	


})



authRouter.get('/logout',(req,res,next)=>{
	

})


authRouter.get('/getPing',(req,res,next)=>{
	console.log(' You have reached the /getPing route');
	res.status(200).send('OK');

})

module.exports = authRouter;
