import React, { Component, Fragment } from 'react';
import InputBox from './InputBox.js';
import Logger from './Logger.js';

class Fitness extends Component{
	render(){
		return<Fragment>
			<h1> Welcome to the Fitness page! </h1>
			<InputBox />
			<Logger />
		</Fragment>
	}
}

export default Fitness;
