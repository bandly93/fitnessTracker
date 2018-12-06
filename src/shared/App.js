import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router,
	Switch,
	Link,
	withRouter,
	Route,
	Redirect 
} from 'react-router-dom';

import { routes } from './routes.js';
import { updateAuth } from './redux/authModule';
import { FlashMessage } from './containers/FlashMessage';
import { resetFlash } from './redux/authModule';
import './styles/App.css';

class App extends Component {

	mapRoutes = () => routes.map((route,i) => <Route
		exact = {route.exact} path = {route.path}
		component = {route.component}
		key = {i}
		/>
	)		
	render() {
		const { message, status } = this.props.auth;
		const { resetFlash } = this.props;
    return<Fragment>
			{
				status ? 
					<div onClick = {resetFlash}> 
						{<FlashMessage props = {{status,message}} />} 
					</div> 
				: 
					null
			}
			<Switch>
				{this.mapRoutes()}
			</Switch>
	 </Fragment>
  }
}

App.propTypes = {
	auth : PropTypes.object.isRequired,
	resetFlash : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
	return {
		auth : state.auth,
	}
}
const mapDispatchToProps = {
	resetFlash
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
