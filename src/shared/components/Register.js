import React,{Component,Fragment} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { sendData } from '../redux/fetchThunk.js';
import { updateAuth } from '../redux/authModule.js'; 
import { registerData } from '../data/registerData';
import { updateState,mapForm,button} from '../utils/inputUtils';

class Register extends Component{
	constructor(props){
		super(props)
		this.state = {
			firstName :'',
			lastName : '',
			email : '',
			password : '',
		}
	}
	componentWillUnmount(){
		this.props.updateAuth({status:''});
	}

	updateState = (e) => {
		const { name,value} = e.target;
		this.setState({[name]:value});
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		const { sendData , updateAuth} = this.props;
		sendData('/api/register','POST',this.state,updateAuth);
	}

	inputForm = () => {
		return registerData.map((f,i) => <input
			key = {i}
			type = {f.type} 
			name = {f.name}
			value = {this.state.name}
			placeholder = {f.placeholder}
			autoComplete = 'off'
			onChange = {this.updateState}
			/>
		)
	}
	
	render(){
		if(this.props.auth.status == 'success') {
			return <Redirect to = {this.props.auth.redirectTo} />
		}else{
	
		return<form>
			{this.inputForm()}
			<button onClick = {this.handleSubmit}> Submit </button>
		</form>
		}
	}
}

const mapStateToProps = (state) => {
	return {
		view: state.view,
		auth : state.auth,
	}
}

const mapDispatchToProps = {
	sendData,
	updateAuth,
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);
