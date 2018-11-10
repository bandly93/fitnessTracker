import {React, Component} from 'react';

class BMR extends Component{
	bmrInput = () => <form>
		

		
	</form>

	calcBMR = () => {		
		if(women){
			return 655+(4.35*lbs)+(4.7*inches)-(4.7*age)*activityRate;
		}else{
			return 66+(6.23*lbs)+(12.7*inches)-(6.8*age)*activityRate;
		}
	}
	render(){
		return<div>
	</div>

	}
}
