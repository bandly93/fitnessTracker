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

const FoodItem = sequelize.define('fitness_table',{
	id : {type : Sequelize.INTEGER,autoIncrement:true, primaryKey : true},
	mealType : Sequelize.STRING,
	item : Sequelize.STRING,
	protein: Sequelize.INTEGER,
	carbohydrate : Sequelize.INTEGER,
	fat: Sequelize.INTEGER,
	calories: Sequelize.INTEGER,
});

module.exports = {
	sequelize,
	Sequelize,	
}
