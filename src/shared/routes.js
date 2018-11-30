import Login from './components/Login';
import FitnessProfile from './components/Fitness';
import Register from './components/Register';
import Home from './components/Home';

export const routes = [
	{		
		path : '/',
		component : Home,
		exact : true,
	},
	{
		path : '/app',
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
