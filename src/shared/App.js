import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import NavBar from './components/NavBar';
import Fitness from './components/Fitness';
import { BrowserRouter as Router,Switch,Link,withRouter,Route,Redirect } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes.js';
import { connect } from 'react-redux';
import { updateAuth } from './redux/authModule.js';

class App extends Component {
	pubRoutes = () => publicRoutes.map((route,i) => <Route
		exact = {route.exact} path = {route.path}
		component = {route.component}
		key = {i}
		/>
	)	

	privRoutes = (Component) => (
		<Route
			render = {() =>
				this.props.auth.isLogged ?
					<Component />
				:
					<Redirect to ='/login' />
			}
		/>
	)
	
	render() {
    return<Fragment>
			<Switch>
				{this.pubRoutes()}
				{this.privRoutes(Fitness)}
			</Switch>
	 </Fragment>
  }
}

const mapStateToProps = (state) => {
	return {
		view : state.view,
		auth : state.auth,
	}
}
const mapDispatchToProps = {
	updateAuth,
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
