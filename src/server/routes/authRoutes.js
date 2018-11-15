import express from 'express'
import passport from 'passport';
const authRouter = express();
import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';
import { Pool, Client } from 'pg'
const LocalStrategy = require('passport-local').Strategy;


const pool = new Pool({
	user: 'bandly',
	host:'localhost',
	database : 'fitnessDB',
	password: '183592bb',
	port :'5432',	
})


authRouter.get('/user',(req,res,next)=>{
	


})

authRouter.post('/login',(req,res,next) => {
	passport.authenticate('local',(err,user, info) => {
		
		if(err) { return next(err) }

		if(!user) { return res.status(500).json({error : 'usernotfound'})}

		req.session.save((err) => {
			if(err){
				return next(err);

			}
			res.status(200).json({success:true});

		})


	})(req,res,next);


})


authRouter.post('/register', async(req,res,next) => {
	console.log('hello, you reached the post register route');
	try {
		
		const client = await pool.connect();
		
		await client.query('BEGIN')
		
		let password = await bcrypt.hash(req.body.password,5);
		
		await JSON.stringify(client.query('SELECT id FROM "users" WHERE "email"=$1',[req.body.email],(err,result) => {
			if(result.rows[0]){
				req.flash('warning',"This email address is already registered");
				res.redirect('/');
			}else{
				client.query('INSERT INTO users(id,"firstName","lastName",email,password, "createdAt","updatedAt") VALUES ($1, $2, $3,$4,$5,$6,$7)',
					[uuidv4(),req.body.firstName,req.body.lastName,req.body.email,password,req.body.createdAt,req.body.updatedAt],
					(err,result)=>{
						if(err){
							console.log(err);
						}else{
							client.query('COMMIT')
							req.flash('success','User created.');
							res.redirect('/app');
							return;
						}

					}
				);
			}	
		}))	
		client.release();
	}
	catch(e){
		throw(e);
	}
})



authRouter.get('/logout',(req,res,next)=>{
	

})


authRouter.get('/getPing',(req,res,next)=>{
	console.log(' You have reached the /getPing route');
	res.status(200).send('OK');

})

passport.use('local',new LocalStrategy({passReqToCallback :true},(req,email,password,done) => {
	let getAccountString = 'SELECT id, "firstName", "lastName", "email", "password" FROM "users" WHERE "email"=$1';
	loginAttempt();
	loginAttempt = async () => {
		const client = await pool.connect();
		try {
			await client.query('BEGIN')
			let checkExist = await JSON.stringify(client.query(getAccountString,[email],(err,result) => {
				if(err){
					return done(err);
				}
				if(!result.rows[0]){
					req.flash('danger', "Oops. Incorrect login details.");
					return done(null,false);
				}else{
					bcrypt.compare(password,result.rows[0].password,(err,check) => {
						if(err){
							console.log('Error while checking password');
						}else if(check){
							return done(null,[{email:result.rows[0].email,firstName : result.rows[0].firstName}]);
						}else{
							req.flash('danger', "Oop. Incorrect login details.");
							return done(null,false);
						}
					});
				}
			}))
		}
		catch(e){
			throw(e);
		}
	}
}))

passport.serializeUser((user,done) => {
	done(null,user);
})

passport.deserializeUser((user,done) =>{
	done(null,user);
})


module.exports = authRouter;
