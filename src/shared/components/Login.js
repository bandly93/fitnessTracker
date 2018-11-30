import React, { Component,Fragment} from 'react';
import { connect} from 'react-redux';
import { sendData,getData,authFetch } from '../redux/fetchThunk.js';
import { Redirect } from 'react-router';
import { updateAuth } from '../redux/authModule.js';
import axios from 'axios';

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
		const { sendData,updateAuth,authFetch } = this.props;
		authFetch('/api/login','POST',this.state,updateAuth);	
	}

	login = () => <form>
		<input 
			type = 'text' 
			name = 'email' 
			value = {this.state.email}
			placeholder = 'Email Address'
			autocomplete = 'off' 
			onChange = {this.updateState} />
		<input 
			type = 'password'
			name = 'password' 
			value = {this.state.password} 
			placeholder = 'Password'
			autocomplete = 'off'
			onChange = {this.updateState} />
		<button onClick = {this.handleClick}>
			Log In
		</button>
	</form>

	render(){
		const { redirectTo,isLogged } = this.props.auth;
		if(isLogged){
			return <Redirect to = { '/app' } />
		}else{
			return<Fragment>
				{this.login()}
			</Fragment>
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
	authFetch,
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
