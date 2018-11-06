const express = require('express');

const pgRouter = express.Router();

import { sequelize } from '../postgres.js';


pgRouter.route('/')
.get(async(req,res) => {
	let data = await sequelize.query("SELECT * FROM fitness_tables");
	res.json({array:data[0]});	
})

.post(async(req,res) => {
	const {fitness_table} = sequelize.models
	fitness_table
		.build(req.body)
		.save()
		.then(async() => {
			let data = await sequelize.query("SELECT * FROM fitness_tables");
			res.json({array:data[0]});	
		})
		.catch(error =>{
			console.error(error);
		})
});


module.exports = pgRouter;
