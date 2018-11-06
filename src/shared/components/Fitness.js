import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import InputBox from './InputBox.js';
import Logger from './Logger.js';
import { addItem } from '../redux/databaseModule';

class Fitness extends Component{
	render(){
		return<Fragment>
			<h1> Hello from the fitness page </h1>
			<InputBox />
			<Logger />
		</Fragment>
	}
}

const mapStateToProps = (state) => {
	return{
		view: state.view,
		database: state.database,		
	}
}

const mapDispatchToProps = {
	addItem
}

export default connect(mapStateToProps,mapDispatchToProps)(Fitness)
