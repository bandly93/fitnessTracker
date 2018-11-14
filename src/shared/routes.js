//import Home from './components/Home.js';
import Login from './components/Login.js';
//import Register from './components/Register.js';
import Fitness from './components/Fitness.js';

export const RoutesArray = [
	{
		path : '/',
		component :Login,
	},
	{
		path : '/app',
		component : Fitness, 
	}
]
