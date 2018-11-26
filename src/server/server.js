import express from 'express';
import bodyParser from 'body-parser';
import { handleRender } from './render.js';
import session from 'express-session';
import { sequelize } from './postgres';
const { user:User} = sequelize.models;
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const port = 3000;

require('./config/passport');

//server setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));

//passport setup
//app.use(session({secret:'keyboard cat',resave:false,saveUninitialized:false}));
app.use(passport.initialize());
//app.use(passport.session());


const pgRouter = require('./routes/pgRouter.js');
const authRouter = require('./routes/authRoutes.js');

app.use('/postgres',pgRouter);
app.use('/api',authRouter);

app.use(handleRender);
app.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});

