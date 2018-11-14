import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { handleRender } from './render.js';
import passport from 'passport';
import {Strategy} from 'passport-local';
import session from 'express-session';

passport.use(new Strategy((username,password,cb) => {
		db.users.findByUsername(username ,(err,user) => {
			if(err) {
				return cb(err);
			};
			if(!user){
				return cb(null,false)
			}
			if(user.password != password){
				return cb(null,false);
			}
		});
	})
);

passport.serializeUser((user,cb) => {
	cb(null,user.id)
});

passport.deserializeUser((id,cb) => {
	db.users.findById(id,(err,user) => {
		if(err){
			return cb(err);
		}
		cb(null,user);
	})
});

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret:'keyboard cat',resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());

const pgRouter = require('./routes/pgRouter.js');
const authRouter = require('./routes/authRoutes.js');

app.use('/postgres',pgRouter);
app.use('/api',authRouter);

app.use(handleRender);
app.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});

