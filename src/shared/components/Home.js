import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
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
			<div id = 'home-title'>
				<h1>Welcome to FitnessTrackr </h1>
				<p> The simple approach to counting macros and start achieving your fitness goals.</p>
			</div>
			<div id = 'input-box'>
				<div id = 'home-input'>
					<h1>{Component === Login ? 'Login' : 'Create an account'}</h1>
					<Component />
				</div>
				<div className = 'or'>
					<hr className = 'bar'/>
					<span> OR </span>
					<hr className = 'bar'/>
				</div>
				<div>
					<p id = 'home-p' onClick = {this.updateState}> 
						{ Component === Login? "Don't have an account?" : 'Already have an account?'}
					</p>
				</div>
			</div>
			<footer id = 'main-footer'>
				<p> Copyright &copy; 2018, FitnessTrackr All Rights Reserved. </p>
				<div>
					<Link to =''> Terms of use </Link> | <Link to =''> Privacy Policy </Link>
				</div>
			</footer>
		</div>
	}
}

Home.propTypes = {

}

export default Home;
