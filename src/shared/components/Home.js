import React, { Component,Fragment } from 'react';
import {Link,Switch} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import '../styles/Home.css';

class Home extends Component {
	constructor(){
		super()
		this.state = {
			Component : Login
		}
	}

	updateState = () => {
		if(this.state.Component === Login){
			this.setState({Component:Register});
		}else{
			this.setState({Component:Login});
		}	
	}	
	render(){
		const { Component } = this.state;
		return<div id = 'home-container'>
			<div id = 'home-left'>
				<h1>Welcome to FitnessTrackr </h1>
				<p> The simple approach to counting macros and start achieving your fitness goals.</p>
			</div>
			<div id = 'home-right'>
				<div id = 'login'>
					<h1>{Component === Login ? 'Login' : 'Register'}</h1>
					<Component />
				</div>
				<div className = 'or'>
					<hr className = 'bar'/>
					<span> OR </span>
					<hr className = 'bar'/>
				</div>
				<div id = 'register'>
					<p id = 'home-p' onClick = {this.updateState}> 
						{ Component === Login? "Don't have an account?" : 'Already have an account?'}
					</p>
				</div>
				<footer id = 'main-footer'>
					<p> Copyright &copy; 2018, FitnessTrackr All Rights Reserved. </p>
					<div>
						<Link to =''> Terms of use </Link> | <Link to =''> Privacy Policy </Link>
					</div>
				</footer>
			</div>
		</div>
	}
}

export default Home;
