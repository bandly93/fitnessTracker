import express from 'express';
import passport from 'passport';
import jwtSecret from '../config/jwtConfig';
import jwt from 'jsonwebtoken';
import { sequelize } from '../postgres';
const { user_table:User } = sequelize.models;
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';
	
const authRouter = express();

authRouter.post('/login',(req,res,next) => {
	passport.authenticate('local',(err,user,info) => {
		if(err || !user){
			console.log(err);
		}else{
			req.logIn(user,async(err) => {
				if(err){
					console.error(err);
					res.json({'status':'error'});
				}else{
					const token = await jwt.sign({email:user.dataValues.email},jwtSecret.secret);
					res.status(200).json({
						auth : true,
						token,
						isLogged : true,
					})
				}
			})
		}
	})(req,res,next);
})

authRouter.post('/register', async (req,res) => {
	const { email } = req.body;
	try{
		let user = await User.findOne({where: {email}});	
		if(user){
			res.json({'status':'Email is already associated with an account, please login with that email'});
		}else{
			let userInfo = {...req.body};
			userInfo.password = await bcrypt.hash(req.body.password,5);
			userInfo.userId = await uuidv4();	
			let createUser = await User.create(userInfo);
			if(createUser){
				res.status(200).json({'status':'User successfully created',redirectTo :'/login'});
			}
		}
	}catch(e){
		throw(e);
	}
})

authRouter.get('/user',(req,res,next) => {
	passport.authenticate('jwt', {session:false},(err,user,info) => {
		if(err){
			console.log(err);
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
