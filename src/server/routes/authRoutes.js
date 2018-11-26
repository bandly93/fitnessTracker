import express from 'express';
import passport from 'passport';
import jwtSecret from '../config/jwtConfig';
import jwt from 'jsonwebtoken';
import { sequelize } from '../postgres';
const { user:User } = sequelize.models;
	
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
					const token = jwt.sign({id:user.dataValues.email},jwtSecret.secret);
					res.status(200).json({
						redirectTo:'/',
						isLogged:true,
						auth :true,
						token,
						user,
						message:'sucess'
					})
				}
			})
		}
	})(req,res,next);
})

module.exports = authRouter;
