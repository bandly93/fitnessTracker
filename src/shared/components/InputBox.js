import React, { Component } from 'react';
import {connect} from 'react-redux';
import { addItem } from '../redux/databaseModule.js';
import {getData, sendData } from '../redux/fetchThunk.js';
import '../styles/Fitness.css';

let radioOptions = ["Breakfast","Lunch","Dinner","Snack"];
let inputOptions = ["Item","Protein","Carbohydrate","Fat"];

let initialState = {
	MealType : '',
	Item : '',
	Protein :'',
	Carbohydrate : '',
	Fat : '',
	Calories: '',
}

class InputBox extends Component {
	constructor(props){
		super(props)
		this.state = initialState;
	}
	updateState = (e) => {
		const { name,value } = e.target;
		this.setState({[name]:value});
	}
		
	handleSubmit = async () =>{
		const { addItem, sendData } = this.props;
		const { Fat,Protein,Carbohydrate} = this.state;
		let Calories = await (Fat * 9 ) + (Protein *4 ) + (Carbohydrate * 4);
		this.setState({Calories});
		sendData('/postgres','POST',this.state,addItem);
	}

	mapRadio = () => radioOptions.map(f => (
		<input 
			key = {f} 
			type = 'button' 
			name = "MealType" 
			className = {this.state.MealType === f? 'active':'none'}  
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


const mapStateToProps = (state) =>{
	return {
		view: state.view,
		database : state.database,
	}
}

const mapDispatchToProps = {
	addItem,
	sendData,
	getData,
}
export default connect(mapStateToProps,mapDispatchToProps)(InputBox);
