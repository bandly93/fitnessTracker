import React, { Component } from 'react';
import { connect} from 'react-redux';
import { sendData,getData } from '../redux/fetchThunk.js';

class Login extends Component{
	constructor(props){
		super(props)
		this.state = {
			email : '',
			password : ''
		}
	}

	updateState = (e) =>{
		const {name,value} = e.target;
		this.setState({[name] : value});
	}

	handleClick = (e) => {
		e.preventDefault();
		
		const { sendData } = this.props;
		sendData('/api/login','POST', this.state);
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
		return	<div>
			<h2> Please Login </h2>
			{this.login()}
		</div>
	}
}

const mapStateToProps = (state) =>{
	return{
		view : state.view,
	}
}

const mapDispatchToProps = {
	sendData,
	getData,
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
