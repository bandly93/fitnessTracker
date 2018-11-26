import React, { Component } from 'react';
import { connect} from 'react-redux';
import { sendData,getData,sendAndUpdateRoute } from '../redux/fetchThunk.js';
import { Redirect } from 'react-router';
import { updateAuth } from '../redux/authModule.js';

class Login extends Component{
	constructor(props){
		super(props)
		this.state = {
			email : '',
			password : '',
		}
	}

	updateState = (e) =>{
		const {name,value} = e.target;
		this.setState({[name] : value});
	}
	
	handleClick = (e) => {
		e.preventDefault();	
		const { sendData,updateAuth,sendAndUpdateRoute } = this.props;
		sendAndUpdateRoute('/api/login','POST',this.state,updateAuth);
	}

	login = () => <div className = 'login-input'>
		<form>
			<input 
				type = 'text' 
				name = 'email' 
				value = {this.state.email}
				placeholder = 'Email Address' 
				onChange = {this.updateState} />
			<input 
				type = 'password'
				name = 'password' 
				value = {this.state.password} 
				placeholder = 'Password'
				onChange = {this.updateState} />
			<button onClick = {this.handleClick}>
				Log In
			</button>
		</form>
	</div>

	render(){
		const { redirectTo } = this.props.auth;
		const { pathname } = this.props.location;

		if(redirectTo && redirectTo !== pathname){
			return <Redirect to = { redirectTo} />
		}else{
			return<div>
				<h2> Please Login </h2>
				{this.login()}
			</div>
		}
	}
}

const mapStateToProps = (state) =>{
	return{
		view : state.view,
		auth : state.auth,
	}
}

const mapDispatchToProps = {
	sendData,
	getData,
	updateAuth,
	sendAndUpdateRoute,
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
