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
	MealType : Sequelize.STRING,
	Item : Sequelize.STRING,
	Protein: Sequelize.FLOAT,
	Carbohydrate : Sequelize.FLOAT,
	Fat: Sequelize.FLOAT,
	Calories: Sequelize.FLOAT,
});

const BMRInput = sequelize.define('bmr_table',{
 
});








module.exports = {
	sequelize,
	Sequelize,	
}
