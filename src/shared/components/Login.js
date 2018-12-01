import React, { Component,Fragment} from 'react';
import { connect} from 'react-redux';
import { sendData,getData,authFetch } from '../redux/fetchThunk.js';
import { Redirect } from 'react-router';
import { updateAuth } from '../redux/authModule.js';
import { loginData } from '../data/loginData';

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

	login = () => {
		return loginData.map((f,i) => <input
			key = {i}
			type = {f.type}
			name = {f.name}
			value = {this.state.name}
			placeholder = {f.placeholder}
			autoComplete = {f.autoComplete}
			onChange = {this.updateState} />
		)
	}
		
	render(){
		const { redirectTo,isLogged } = this.props.auth;
		if(isLogged){
			return <Redirect to = { '/app' } />
		}else{
			return<form>
				{this.login()}
				<button onClick = {this.handleClick}>
					Log In
				</button>
			</form>
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
