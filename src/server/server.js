import "@babel/polyfill";

import express from 'express';
import bodyParser from 'body-parser';
import { handleRender } from './render.js';
import expressStaticGzip from 'express-static-gzip';
import { sequelize } from './postgres';
import passport from 'passport';
import morgan from 'morgan';

const app = express();
const port = 3001;

require('./config/passport');

sequelize.sync({force:false});
//server setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(expressStaticGzip('dist',{enableBrotili:true}));

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

