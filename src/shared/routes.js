import FitnessProfile from './components/Fitness';
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
];
