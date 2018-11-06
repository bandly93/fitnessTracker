import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import NavBar from './components/NavBar';
import Fitness from './components/Fitness';

/* uncomment	for google analytics */

// import ga from 'react-ga';
// import {GA_CODE} from '../../config.json';

class App extends Component {
  /*
	componentDidMount(){
		ga.initialize(GA_CODE,{debug:false});
		ga.pageview(this.props.location.pathname);
	}
	componentWillUpdate(nextProps){
		if(nextProps.location.pathname !== this.props.location.pathname){
			ga.pageview(nextProps.location.pathname);
		}
	}
	*/
  render() {
    return<div>
			<Fitness />
    </div>
  }
}

App.propTypes = {
	


}

export default App;
