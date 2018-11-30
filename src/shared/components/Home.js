import React, { Component,Fragment } from 'react';
import {Link,Switch} from 'react-router-dom';
import Login from './Login';
import '../styles/Home.css';

class Home extends Component {
	render(){
		return<div id = 'home-container'>
			<div id = 'home-left'>
				<h1>Welcome to FitnessApp </h1>
				<p> The simple approach to counting macros and start achieving your fitness goals.</p>
			</div>
			<div id = 'home-right'>
				<div id = 'login'>
					<h1> LOGIN </h1>
					<Login />
				</div>
				<div className = 'or'>
					<hr className = 'bar'/>
					<span> OR </span>
					<hr className = 'bar'/>
				</div>
				<div id = 'register'>
					<Link to = '/register'> Create an account </Link>
				</div>
				<footer id = 'main-footer'>
					<p> Copyright &copy; 2018, FitnessApp All Rights Reserved. </p>
					<div>
						<Link to =''> Terms of use </Link> | <Link to =''> Privacy Policy </Link>
					</div>
				</footer>
			</div>
		</div>
	}
}

export default Home;
