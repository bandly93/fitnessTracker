import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import NavBar from './components/NavBar';
import Fitness from './components/Fitness';
import { BrowserRouter as Router,Switch,Link,withRouter,Route } from 'react-router-dom';
import { RoutesArray } from './routes.js';
import {renderRoutes } from 'react-router-config';

class App extends Component {
	mapRoutes = () => RoutesArray.map((route,i) => <Route
		exact path = {route.path}
		component = {route.component}
		key = {i}
		/>
	)	
	render() {
    return<Fragment>
			{this.mapRoutes()}		
	 </Fragment>
  }
}

export default withRouter(App);
