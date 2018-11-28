import Login from './components/Login.js';
import FitnessProfile from './components/Fitness.js';
import Register from './components/Register.js';

export const routes = [
	{
		path : '/',
		component : FitnessProfile,
		exact : true,
	},
	{
		path : '/login',
		component : Login,
		exact : true,
	},
	{
		path : '/register',
		component : Register,
		exact : true,
	},
];
