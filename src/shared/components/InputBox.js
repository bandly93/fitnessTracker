import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem } from '../redux/databaseModule.js';
import { getData,sendData } from '../redux/fetchThunk.js';
import '../styles/InputBox.css';

let radioOptions = ["Snack","Breakfast","Lunch","Dinner"];
let inputOptions = ["item","protein","carbohydrate","fat"];

class InputBox extends Component {
	constructor(props){
		super(props)
		this.state = this.getInitialState();
	}

	getInitialState = () => {
		return {
			userId : '',
			mealType: '',
			item : '',
			protein : '',
			carbohydrate : '',
			fat : '',
			calories : '',
		}
	}

	setInitialState = () => {
		this.setState(this.getInitialState());
	}
	
	updateState = (e) => {
		const { name,value } = e.target;
		this.setState({[name]:value});
	}
		
	handleSubmit = async (e) =>{
		e.preventDefault();
		const { addItem, sendData, auth } = this.props;
		const { fat,protein,carbohydrate } = this.state;
		let calories = await (fat * 9) + (protein * 4) + (carbohydrate * 4);
		this.setState({calories,userId:auth.user.userId});
		sendData('/postgres/addFood','POST',this.state,addItem);
		this.setState(this.getInitialState());
	}

	mapRadio = () => radioOptions.map(f => (
		<input 
			key = {f} 
			type = 'button' 
			name = "mealType" 
			className = {this.state.mealType === f? 'active':'none'}  
			value = {f} 
			onClick = {this.updateState} />
	))

	mapInput = () => inputOptions.map(f => ( 
		<input
			key = {f} 
			type = "text" 
			name = {f} 
			placeholder = {f}
			autoComplete = 'off'
			value = {this.state[f]} 
			onChange = {this.updateState} 
		/>
	))

	render(){
		return<div className ='meal-entry'>
			<form className = 'input-form'>
				<h1> Entry Form </h1>
				<p> Select meal type : </p>
				<ul>{this.mapRadio()}</ul>
				<p> Enter food macros : </p>
				<ul>{this.mapInput()}</ul>
				<div className = 'input-footer'>	
					<input
						type = 'button'
						onClick = {this.setInitialState}
						className = 'clear-btn'
						value = 'Clear'
					/>
					<input 
						type = 'submit' 
						onClick = {this.handleSubmit} 
						className = 'submit-btn'
						value = 'Submit' 
					/>
				</div>
			</form>
		</div>
	}
}

InputBox.propTypes = {
	database : PropTypes.object.isRequired,
	auth : PropTypes.object.isRequired,
	addItem : PropTypes.func.isRequired,
	sendData : PropTypes.func.isRequired,
	getData : PropTypes.func.isRequired,	
}

const mapStateToProps = (state) =>{
	return {
		database : state.database,
		auth: state.auth,
	}
}

const mapDispatchToProps = {
	addItem,
	sendData,
	getData,
}

export default connect(mapStateToProps,mapDispatchToProps)(InputBox);
