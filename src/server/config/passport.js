import jwtSecret from './jwtConfig';
import bcrypt from 'bcrypt';
import { sequelize } from '../postgres';
const { user:User } = sequelize.models;

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const localOpts = {
	usernameField:'email',
	session:false,
}

passport.use('local', new LocalStrategy(localOpts,async(email,password,done) => {
	try {
		let user = await User.findOne({where:{email}});
		let checkPassword = await bcrypt.compare(password,user.dataValues.password);
		if(!user || !checkPassword) {
			return done(null,false,{message : 'bad credentails'});
		}else{
			return done(null,user);
		}
	}
	catch(err){
		done(err);	
	}
}))

const jwtOpts = {
	jwtFromRequest : ExtractJWT.fromAuthHeaderWithScheme('JWT'),
	secretOrKey : jwtSecret.secret,
}

passport.use('jwt', new JWTStrategy(jwtOpts,async(jwt_payload,done) => {
	console.log(jwt_payload,'jwt_payload');
	try {
		let user = await User.findOne({where:{email : jwt_payload.id}});
		if(!user){
			done(null,false);
		}else{
			done(null,user);
		}
	}
	catch(e){
		done(err)
	}
}))

passport.serializeUser((user,done) => {
	done(null,user);
});

passport.deserializeUser((user,done) => {
	done(null,user);
});
