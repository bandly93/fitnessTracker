import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import NavBar from './components/NavBar';
import FitnessProfile from './components/Fitness';
import { BrowserRouter as Router,Switch,Link,withRouter,Route,Redirect } from 'react-router-dom';
import { routes } from './routes.js';
import { connect } from 'react-redux';
import { updateAuth } from './redux/authModule.js';

class App extends Component {
	mapRoutes = () => routes.map((route,i) => <Route
		exact = {route.exact} path = {route.path}
		component = {route.component}
		key = {i}
		/>
	)		
	render() {
    return<Fragment>
			<Switch>
				{this.mapRoutes()}
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
