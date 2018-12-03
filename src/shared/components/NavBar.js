import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router,
	Route,
	Link,
	Switch,
	withRouter 
} from 'react-router-dom';
import { connect } from 'react-redux';

class NavBar extends Component{

	navBar = () => {
		return <nav>
			<div>
				<Link to = '/about_me'> ABOUT </Link>
				<Link to = '/contact'> CONTACT </Link>
				<Link to = '/'> PROJECTS </Link>	
			  <Link to = '/resume'> RESUME </Link>
       </div> 
		</nav>
	}
	
	render(){
		return<Fragment>
			{this.navBar()}
			<Switch>
				{this.routes()}
			</Switch>
		</Fragment>	
	}
}
export default NavBar;
