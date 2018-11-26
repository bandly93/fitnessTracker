import Login from './components/Login.js';
import Fitness from './components/Fitness.js';
import Register from './components/Register.js';

export const publicRoutes = [
	{
		path : '/login',
		component :Login,
		exact : false,
		private : false,
	},
	{
		path : '/register',
		component : Register,
		exact : false,
		private : false,
	},
]

export const privateRoutes = [
	{
		path: '/',
		component : Fitness,
		exact : true,
		private : true,
	}
]
