import express from 'express';
import bodyParser from 'body-parser';
import { handleRender } from './render.js';
//import session from 'express-session';
import { sequelize } from './postgres';
import passport from 'passport';
import morgan from 'morgan';

const app = express();
const port = 3000;

require('./config/passport');

sequelize.sync({force:false});
//server setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));

//passport setup
app.use(passport.initialize());

const pgRouter = require('./routes/pgRouter.js');
const authRouter = require('./routes/authRoutes.js');

app.use('/postgres',pgRouter);
app.use('/api',authRouter);

app.use(handleRender);
app.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});

