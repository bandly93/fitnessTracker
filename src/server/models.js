const { sequelize,Sequelize } = require('./postgres.js');


console.log(sequelize);

const FoodItem = sequelize.define('foodItem',{
	id : {type : Sequelize.INTEGER,autoIncrement:true},
	time : { type : Sequelize.DATE, defaultValue : Sequelize.NOW},
	mealType : Sequelize.STRING,
	item : Sequelize.STRING,
	protein: Sequelize.INTEGER,
	carbohydrate : Sequelize.INTEGER,
	fat: Sequelize.INTEGER,
	calories: Sequelize.INTEGER,
});



