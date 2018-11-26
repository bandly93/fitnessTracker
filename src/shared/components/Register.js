import React,{Component,Fragment} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { sendData } from '../redux/fetchThunk.js';
import { updateAuth } from '../redux/authModule.js'; 

let array = [
	{
		name : 'firstName',
		type : 'text',
		text : 'First Name',
	},
	{
		name : 'lastName',
		type : 'text',
		text : 'Last Name',
	},
	{
		name : 'email',
		type : 'email',
		text : 'Email',
	},
	{
		name : 'password',
		type : 'password',
		text : 'Password',
	},
	{
		name : 'confirmPass',
		type : 'password',
		text : 'Confirm Password',
	},
]

class Register extends Component{
	constructor(props){
		super(props)
		this.state = {
			firstName :'',
			lastName : '',
			email : '',
			password : '',
			confirmPass : '',
		}
	}
	compon

	updateState = (e) => {
		const { name,value} = e.target;
		this.setState({[name]:value});
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		const { sendData , updateAuth} = this.props;
		sendData('/api/register','POST',this.state,updateAuth);
	}

	inputForm = () => array.map(f => {
		const {text,type,name } = f;
		return <div key = {f.name}>
			<p> {text} </p>
			<input
				type = {type} 
				name = {name}
				value = {this.state.name}
				onChange = {this.updateState}
			/>
		</div>
	})

	render(){
		if(this.props.auth.redirectTo){
			console.log(this.props);
			return <Redirect  to = {this.props.auth.redirectTo} />
		}else{
			return<Fragment>
				{this.inputForm()}
				<button onClick = {this.handleSubmit}> Submit </button>
			</Fragment>
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

