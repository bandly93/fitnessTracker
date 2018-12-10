const express =require('express');
const passport =require('passport');
const jwtSecret =require('../config/jwtConfig');
const jwt =require('jsonwebtoken');
const { sequelize } =require('../postgres');
const { user_table:User } = sequelize.models;
const uuidv4 =require('uuid/v4');
const bcrypt =require('bcrypt');
	
const authRouter = express();

authRouter.post('/login',(req,res,next) => {
	passport.authenticate('local',(err,user,info) => {
		if(err || !user){
			res.json({status:'error',message : 'Invalid credentials were provided'});
		}else{
			console.log('hello from ehre too');
			req.logIn(user,async(err) => {
				if(err){
					console.error(err);
					res.json({status:'error',message:'Invalid credentials were provided.'});
				}else{
					const token = await jwt.sign({email:user.dataValues.email},jwtSecret.secret);
					res.status(200).json({
						auth : true,
						token,
						isLogged : true,
						user,
						status : 'success',
						message : 'Credentials validated and user has successfully logged in.'
					})
				}
			})
		}
	})(req,res,next);
})

authRouter.post('/register', async (req,res) => {
	const { email } = req.body;
	try{
		let user = await User.findOne({where:{email}});	
		if(user){
			res.json({
				status:'error',
				message:'Email is already associated with an account, please login with that email'
			});
		}else{
			let userInfo = {...req.body};
			userInfo.password = await bcrypt.hash(req.body.password,5);
			userInfo.userId = await uuidv4();	
			let createUser = await User.create(userInfo);
			if(createUser){
				res.status(200).json({status:'success',message:'Account registered',redirectTo:'/app'});
			}else{
				res.json({status:'error', message:'Error registering credentials'});
			}
		}
	}catch(e){
		throw(e);
	}
})

authRouter.get('/user',(req,res,next) => {
	passport.authenticate('jwt', {session:false},(err,user,info) => {
		if(err){
			res.json({status:'error',message:err});
		}else{
			delete user.dataValues.password;
			res.status(200).json({
				isLogged:true,
				auth:true,
				user,
			})
		}
	})(req,res,next);
})

module.exports = authRouter;
