//Library
import React, { Fragment,Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
//Components
import Logger from './Logger';
import NavBar from './NavBar';
//Containers
import { Report } from '../containers/Report';
import { Title } from '../containers/Title';
//Utility
import { authFetch,sendData } from '../redux/fetchThunk';
import { updateAuth } from '../redux/authModule';
import { addItem } from '../redux/databaseModule';

class FitnessProfile extends Component {
	async componentDidMount(){
		const { authFetch,updateAuth,auth,addItem,sendData } = this.props;
		const jwtToken = localStorage.getItem('JWT');
		if(jwtToken){
			await axios
				.get('/api/user',{
					headers : { Authorization : `JWT ${jwtToken}`},
				})
				.then(response => {
					updateAuth(response.data);
					sendData('/postgres/getUserInfo','POST',auth.user,addItem);	
				})
				.catch(err => {
					console.log(err);
				})	
		}
	}

	getGraphData = () => {
		const { dailyItems } = this.props.database;
		let macros = [0,0,0];
		dailyItems.forEach((item) => {
			macros[0] += item.protein;
			macros[1] += item.carbohydrate;
			macros[2] += item.fat;
		})
		return {
			title: "Today's Consumption",
			count : dailyItems.length,
			pro: macros[0],
			carbs : macros[1],
			fats : macros[2],
			labels: ['Protein','Carbs','Fats'],
			datasets: [
				{
					data: macros,
					backgroundColor: ['#FF6384','#36A2EB','#FFCE56'],
					hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56']
				}
			]
		}
	}
		
	render(){
		const { user,auth } = this.props.auth;
		let text = 'Dashboard';
		if(!auth){
			return <Redirect to = {'/'} />
		}else{
			return<Fragment>
				<NavBar />	
				<Title props = {{user}}/>
				<Report data = {this.getGraphData()} />
				<Logger />
			</Fragment>
		}
	}
}

FitnessProfile.propTypes = {
	auth : PropTypes.object.isRequired,
	database : PropTypes.object.isRequired,
	authFetch : PropTypes.func,
	updateAuth : PropTypes.func,
	addItem : PropTypes.func,
	sendData : PropTypes.func,
}

const mapStateToProps = (state) => {
	return{
		auth : state.auth,
		database : state.database,
	}
} 

const mapDispatchToProps = {
	authFetch,
	updateAuth,
	addItem,
	sendData,
}

export default connect(mapStateToProps,mapDispatchToProps)(FitnessProfile);
