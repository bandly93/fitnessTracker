import React, { Fragment } from 'react';
import InputBox from './InputBox.js';
import Logger from './Logger.js';
import BMR from './BMR.js';

const Fitness = () => {
	return<Fragment>
		<h1> Welcome to the Fitness page! </h1>
		<InputBox />
		<BMR />
		<Logger />
	</Fragment>
}
export default Fitness;
