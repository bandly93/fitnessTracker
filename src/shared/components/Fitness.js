import React, { Fragment,Component } from 'react';
import InputBox from './InputBox.js';
import Logger from './Logger.js';
import BMR from './BMR.js';
import { authFetch } from '../redux/fetchThunk.js';
import { connect,store } from 'react-redux';
import { updateAuth,resetAuth } from '../redux/authModule.js';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { resetDB } from '../redux/databaseModule.js';

class FitnessProfile extends Component {
	
	async componentDidMount(){
		const { authFetch,updateAuth,auth } = this.props;
		const jwtToken = localStorage.getItem('JWT');
		if(jwtToken){
			await axios
				.get('/api/user',{
					headers : { Authorization : `JWT ${jwtToken}`},
				})
				.then(response => {
					updateAuth(response.data);
				})
				.catch(err => {
					console.log(err);
				})
		}	
	}
	
	handleLogout = () => {
		const { resetAuth,resetDB } = this.props;
		delete localStorage.JWT;
		resetAuth();
		resetDB();	
	}

	logoutButton = () => {
		return <div>
			<p onClick = {this.handleLogout}> Logout </p>
		</div>
	}			
	
	render(){
		const { user,isLogged,auth } = this.props.auth;
		if(!auth){
			return <Redirect to = {'/'} />
		}else{
			return<Fragment>
				{this.logoutButton()}
				<h1>Hello, {user.firstName} </h1>
				<h1> Welcome to the Fitness page! </h1>
				<InputBox />
				<BMR />
				<Logger />
			</Fragment>
		}
	}
}

const mapStateToProps = (state) => {
	return{
		auth : state.auth,
	}
} 

const mapDispatchToProps = {
	authFetch,
	updateAuth,
	resetAuth,
	resetDB,
}

export default connect(mapStateToProps,mapDispatchToProps)(FitnessProfile);
