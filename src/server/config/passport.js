import jwtSecret from './jwtConfig';
import bcrypt from 'bcrypt';
import { sequelize } from '../postgres';
const { user_table:User } = sequelize.models;
import passport from 'passport';
const { Strategy:JWTStrategy , ExtractJwt } = require('passport-jwt');
const { Strategy:LocalStrategy } = require('passport-local');

const localOpts = {
	usernameField:'email',
	session:false,
}

passport.use('local', new LocalStrategy(localOpts,async(email,password,done) => {
	try {
		let user = await User.findOne({where:{email}});
		if(!user) {
			return done(null,false);
		}
		let checkPassword = await bcrypt.compare(password,user.dataValues.password);
		if(!checkPassword){
			return done(null,false);
		}
		return done(null,user);
	}
	catch(e){
		done(e);	
	}
}))

const jwtOpts = {
	jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('JWT'),
	secretOrKey : jwtSecret.secret,
}

passport.use('jwt', new JWTStrategy(jwtOpts,async(payload,done) => {
	try {
		let user = await User.findOne({where:{email : payload.email}});
		if(!user){
			console.log('no user in database');
			done(null,false);
		}else{
			console.log('user found in passport');
			done(null,user);
		}
	}
	catch(e){
		done(err)
	}
}))

passport.serializeUser((user,done) => {
	done(null,user.userId);
});

passport.deserializeUser((id,done) => {
	User.findByPk(id,(err,user) => {
		done(err,user);
	})
});
