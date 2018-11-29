const express = require('express');
const pgRouter = express();
import { sequelize } from '../postgres.js';
const { food_table:Food , bmr_table:BMR } = sequelize.models;

pgRouter.post('/getUserInfo', async(req,res) => {
		const { userId } = req.body;
		try {
			let foodItems = await Food.findAll({where:{userId}});
			let bmr = await BMR.findOne({where:{userId}});
			res.json({foodItems,bmr});
		}
		catch(e){
			throw(e);
		}
});

pgRouter.post('/addFood',(req,res) => {
	const { userId } = req.body;
	Food
		.build(req.body)
		.save()
		.then(async() => {
			let foodItems = await Food.findAll({where: {userId}});
			res.json({foodItems});	
		})
		.catch(err => {
			console.log(err);
		})
});

pgRouter.post('/addBmr', async(req,res) => {
	const { userId } = req.body;
	try {
		let bmr = await BMR.findOne({where:{userId}});
		if(bmr){
			let update = await BMR.update(req.body,{where:{userId}});
		}else{
			let create = await BMR.create(req.body);
		}
		let response = await BMR.findOne({where:{userId}});
		res.json({bmr:response.dataValues});
	}catch(e){
		throw(e)
	}	
});

module.exports = pgRouter;
