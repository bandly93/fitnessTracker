import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { handleRender } from './render.js';
import session from 'express-session';
import flash from 'connect-flash';
import { sequelize } from './postgres';
import passport from 'passport'

const app = express();
const port = 3000;


sequelize.sync({force:true})




app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret:'keyboard cat',resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());




const pgRouter = require('./routes/pgRouter.js');
const authRouter = require('./routes/authRoutes.js');

app.use('/postgres',pgRouter);
app.use('/api',authRouter);

app.use(handleRender);
app.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});

