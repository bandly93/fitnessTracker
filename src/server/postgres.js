import {Sequelize} from 'sequelize';

import { DB_NAME,DB_USERNAME, DB_PASSWORD } from '../../config.json';

export const sequelize = new Sequelize(
	DB_NAME,DB_USERNAME,DB_PASSWORD,{
		host : 'localhost',
		port : 5432,
		dialect : 'postgres',
		operatorsAliases : Sequelize.Op,
		logging : false,
	}
);

const FoodItem = sequelize.define('food_table',{
	id : {type : Sequelize.INTEGER,autoIncrement:true, primaryKey:true},
	userId : Sequelize.STRING,
	mealType : Sequelize.STRING,
	item : Sequelize.STRING,
	protein: Sequelize.FLOAT,
	carbohydrate : Sequelize.FLOAT,
	fat: Sequelize.FLOAT,
	calories: Sequelize.FLOAT,
});

const BMRInput = sequelize.define('bmr_table',{
	userId : Sequelize.STRING,
	height : Sequelize.FLOAT,
	weight : Sequelize.FLOAT,
	age : Sequelize.INTEGER,
	gender : Sequelize.STRING,
});

const User = sequelize.define('user_table',{
	userId: { type : Sequelize.STRING, primaryKey : true},
	firstName : Sequelize.STRING,
	lastName : Sequelize.STRING,
	email : Sequelize.STRING,
	password : Sequelize.STRING,
});

module.exports = {
	sequelize,
	Sequelize,
	User,
	FoodItem,
	BMRInput,	
}
