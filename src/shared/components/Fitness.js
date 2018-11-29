import React, { Fragment,Component } from 'react';
import InputBox from './InputBox.js';
import Logger from './Logger.js';
import BMR from './BMR.js';
import { authFetch } from '../redux/fetchThunk.js';
import { connect } from 'react-redux';
import { updateAuth } from '../redux/authModule.js';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class FitnessProfile extends Component {
	constructor(){
		super()
		this.state = {
			token : localStorage.getItem('JWT'),
		}
	}
	
	async componentDidMount(){
		const { authFetch,updateAuth,auth } = this.props;
		let jwtToken = this.state.token;
		if(jwtToken){
			await axios
				.get('/api/user',{
					headers : { Authorization : `JWT ${jwtToken}`},
				})
				.then(response => {
					updateAuth(response.data);
				})	
		}	
	}
	
	handleLogout = () => {
		delete localStorage.JWT;
		this.props.updateAuth({isLogged:false,auth:false,user:{},token:''});
	}

	logoutButton = () => {
		return <div>
			<p onClick = {this.handleLogout}> Logout </p>
		</div>
	}			
	
	render(){
		console.log(this.state.token, 'token from state');
		const { isLogged,user} = this.props.auth;
		if(!this.state.token){
			return <Redirect to = {'/login'} />
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
}

export default connect(mapStateToProps,mapDispatchToProps)(FitnessProfile);
