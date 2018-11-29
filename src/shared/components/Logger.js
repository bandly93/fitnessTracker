import React, { Component,Fragment } from 'react';
import ReactTable from 'react-table';
import { addItem } from '../redux/databaseModule.js';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import { sendData,getData } from '../redux/fetchThunk.js';

let columns = ['createdAt','mealType','item','protein','carbohydrate','fat','calories'];

for ( let i = 0 ; i < columns.length; i++){
	columns[i] = {'Header' : columns[i],'accessor' : columns[i]}
}

class Logger extends Component{	
	componentDidMount(){
		const { sendData,addItem,auth} = this.props;	
		sendData('/postgres/getUserInfo','POST',auth.user,addItem);
	}
	render(){
		const{foodItems} = this.props.database;
		return<Fragment>
			<ReactTable
				className = '-striped -highlight'
				data = {foodItems} 
				columns = {columns} 
				defaultPageSize = {10}
			/>
		</Fragment>
	}
}

const mapStateToProps = (state) =>{
	return {
		view : state.view,
		database : state.database,
		auth : state.auth,
	}
}

const mapDispatchToProps = {
	addItem,
	sendData,
	getData,
}

export default connect(mapStateToProps,mapDispatchToProps)(Logger);
