import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import { addItem } from '../redux/databaseModule';
import { sendData,getData } from '../redux/fetchThunk';

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

Logger.propTypes = {
	database : PropTypes.object.isRequired,
	auth : PropTypes.object.isRequired,
	addItem : PropTypes.func.isRequired,
	sendData : PropTypes.func.isRequired,
	getData : PropTypes.func.isRequired,	
}

const mapStateToProps = (state) =>{
	return {
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
