import express from 'express';
import bodyParser from 'body-parser';
import { handleRender } from './render.js';
import {sequelize,syncModels} from './postgres.js';

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

sequelize.sync({force:false})
	.then(res => {
		console.log('Successfully synced models on load', res.models);
	})
	.catch(err => {
		console.error('Error from syncing models on load');
	})

const pgRouter = require('./routes/pgRouter.js');

app.use('/postgres',pgRouter);
app.use(handleRender);
app.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});

