import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem } from '../redux/databaseModule.js';
import { getData,sendData } from '../redux/fetchThunk.js';
import '../styles/Fitness.css';

let radioOptions = ["Breakfast","Lunch","Dinner","Snack"];
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
	
	updateState = (e) => {
		const { name,value } = e.target;
		this.setState({[name]:value});
	}
		
	handleSubmit = async () =>{
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

	mapInput = () => inputOptions.map(f => <div className = 'food-item' key = {f}>
		{f}
		<input type = "text" name = {f} value = {this.state[f]} onChange = {this.updateState} />
	</div>)

	render(){
		return<div>
			<form className = 'input-form'>
				<p> Time of Meal </p>
				<ul>{this.mapRadio()}</ul>
				<p> Food Description </p>
				<ul>{this.mapInput()}</ul>
				<p onClick = {this.handleSubmit} className = 'submit-btn'>Submit</p>
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
