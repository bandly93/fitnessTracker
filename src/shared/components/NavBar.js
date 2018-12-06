//Library
import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router,
	Route,
	Link,
	Switch,
	withRouter 
} from 'react-router-dom';
//Utility
import { updateAuth,resetAuth } from '../redux/authModule';
import { resetDB } from '../redux/databaseModule';
import '../styles/NavBar.css';

class NavBar extends Component{	
	handleLogout = () => {
		const{ resetAuth,resetDB } = this.props;
		delete localStorage.JWT;
		resetAuth();
		resetDB();
	}

	logoutButton = () => {
		return <div>
			<div onClick = {this.handleLogout}> Logout </div>
		</div>
	}
		
	navBar = () => {
		return <nav id = 'navbar'>
			<div id = 'navbar-left'>
				<div><Link to =''> Home </Link></div>
			</div>
			<div id = 'navbar-right'>
				<div><Link to = ''> Reports </Link></div>
				<div><Link to = ''> Account </Link></div>
				{this.logoutButton()} 
			</div>
		</nav>
	}
	render(){
		return<Fragment>
			{this.navBar()}
		</Fragment>	
	}
}

NavBar.propTypes = {
	updateAuth : PropTypes.func.isRequired,
	resetDB : PropTypes.func.isRequired,
	resetAuth : PropTypes.func.isRequired,
	auth : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
	return{
		auth : state.auth,
	}
}

const mapDispatchToProps = {
	updateAuth,
	resetAuth,
	resetDB,
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);
