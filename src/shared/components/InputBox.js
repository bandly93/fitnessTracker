import React, { Component } from 'react';
import {connect} from 'react-redux';
import { addItem } from '../redux/databaseModule.js';
import {getData, sendData } from '../redux/fetchThunk.js';

let radioOptions = ["Breakfast","Lunch","Dinner","Snack"];
let inputOptions = ["item","protein","carbohydrate","fat"];

let initialState = {
	mealType : '',
	item : '',
	protein : 0,
	carbohydrate : 0,
	fat : 0,
	calories: 0,
}

class InputBox extends Component {
	constructor(props){
		super(props)
		this.state = initialState;
	}
	updateState = (e) => {
		const { value,name } = e.currentTarget;
		this.setState({[name]:value});
	}
		
	handleSubmit = async () =>{
		const { addItem, sendData } = this.props;
		const { fat, protein,carbohydrate} = this.state;
		let calories = await (fat * 9 ) + (protein *4 ) + (carbohydrate * 4)
		this.setState({calories});
		sendData('/postgres','POST',this.state,addItem)	
	}

	mapRadio = () => radioOptions.map(f => <div key = {f}>
		<input type = "radio" name = "mealType" value = {f} onClick = {this.updateState}/>
		{f}
	</div>)

	mapInput = () => inputOptions.map(f => <div className = 'food-item' key = {f}>
		<input type = "text" name = {f} value = {this.state[f]} onChange = {this.updateState} />
		{f}
	</div>)

	render(){
		return<div>
			<form>
				{this.mapRadio()}
				{this.mapInput()}
				<p onClick = {this.handleSubmit}>Submit</p>
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
