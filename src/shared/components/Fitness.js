import React, { Component, Fragment } from 'react';
import InputBox from './InputBox.js';
import Logger from './Logger.js';
import BMR from './BMR.js';

class Fitness extends Component{
	render(){
		return<Fragment>
			<h1> Welcome to the Fitness page! </h1>
			<InputBox />
			<BMR />
			<Logger />
		</Fragment>
	}
}

export default Fitness;
