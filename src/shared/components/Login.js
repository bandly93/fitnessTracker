import React, { Component,Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import { sendData,getData,authFetch } from '../redux/fetchThunk';
import { Redirect } from 'react-router';
import { updateAuth } from '../redux/authModule';
import { loginData } from '../data/loginData';
import { checkInputForm } from '../utils/inputUtils';

class Login extends Component{
	constructor(props){
		super(props)
		this.state = this.getInitialState();
	}	

	getInitialState = () => {
		return{
			email : null,
			password : null,
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

Login.propTypes = {
	auth : PropTypes.object,
	sendData : PropTypes.func,
	getData : PropTypes.func,
	updateAuth : PropTypes.func,
	authFetch : PropTypes.func,
}

const mapStateToProps = (state) =>{
	return{
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
