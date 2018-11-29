const express = require('express');
const pgRouter = express();
import { sequelize } from '../postgres.js';
const { food_table:Food , bmr_table:BMR } = sequelize.models;

pgRouter.post('/getUserInfo', async(req,res) => {
		const { userId } = req.body; 
		try {
			let userInfo = {};
			userInfo.foodItems = await Food.findAll({where: {userId}});
			userInfo.bmr = await BMR.findOne({where:{userId}});
			res.send({data:userInfo});
		}
		catch(e){
			throw(e);
		}
});

pgRouter.post('/addFood',(req,res) => {
	console.log(req.body);

	Food
		.build(req.body)
		.save()
		.then(async() => {
			let data = await Food.findAll({where: {userId:req.body.userId}});			
		})
		.catch(err => {
			console.log(err);
		})
});

pgRouter.post('/addBmr', (req,res) => {

	BMR
		.build(req.body)
		.save()
		.then(async () => {
			let data = await BMR.findAll({where: {userID:req.body.userId}});
		})
		.catch(err => {
			console.log(err);
		})
});

module.exports = pgRouter;
