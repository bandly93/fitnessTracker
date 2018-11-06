import React, { Component,Fragment} from 'react';
import ReactTable from 'react-table';
import {addItem} from '../redux/databaseModule.js';
import {connect} from 'react-redux';
import 'react-table/react-table.css';
import {sendData,getData} from '../redux/fetchThunk.js';

let columns = ['id','createdAt','mealType','item','protein','carbohydrate','fat','calories'];

for ( let i = 0 ; i < columns.length; i++){
	columns[i] = {'Header' : columns[i],'accessor' : columns[i]}
}

class Logger extends Component{
	componentDidMount(){
		const { getData,addItem} = this.props;
		getData('/postgres',addItem);
	}
	render(){
		const{array} = this.props.database;
		return<Fragment>
			<ReactTable data = {array} columns = {columns} />
		</Fragment>
	}
}

const mapStateToProps = (state) =>{
	return {
		view:state.view,
		database : state.database,
	}
}

const mapDispatchToProps = {
	addItem,
	sendData,
	getData,
}

export default connect(mapStateToProps,mapDispatchToProps)(Logger);
