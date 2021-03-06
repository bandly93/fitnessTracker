import  React ,{ Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendData } from '../redux/fetchThunk';
import { updateAuth } from '../redux/authModule';
import { addItem } from '../redux/databaseModule';
import { setFlashMessage } from '../redux/flashModule';
import { inputData } from '../data/bmrData';
import { checkInputForm } from '../utils/inputUtils';
import '../styles/BMR.css';

class BMR extends Component{
	constructor(props){
		super(props)
		this.state = this.getInitialState();
	}

	getInitialState = () => {
		return {
			feet : null,
			inches : null,
			weight : null,
			age : null,
			gender: null,
			bmr : null,
		}
	}

	updateState = (e) =>{
		const { name,value } = e.target;
		this.setState({[name]:value});
	}	
	
	handleSubmit = async (e) => {
		e.preventDefault();
		let init = await this.getInitialState();
		delete init.bmr;
		let valid = await checkInputForm(init,this.state);
		
		if(valid){
			this.setState({bmr: await this.calcBMR()});
			const { sendData , addItem } = this.props;
			let bmrInfo = {...this.state};
			bmrInfo.userId = this.props.auth.user.userId;	
			sendData('/postgres/addBmr','POST',bmrInfo,addItem);
		}else{
			this.props.updateAuth({status:'error',message:'Please fill form to continue.'});	
		}	
	}

	bmrInput = () => <form>
		<p> Lets get started by entering your body measurements. This will ultimately help us build out your personalize dashboard. Don't worry, you can always update your body measurements as you go, incase you lose weight or gain muscle! Once you've finished adding your body measurements, press "View Dashboard" to view your new account.</p>
		<div id ='bmr-input'>
			<div className = 'height-wrapper'>	
				<h3>Height</h3>
				<div className = 'bmr-input'>
					<input 
						onChange = {this.updateState}
						type = "text"  
						name = "feet"
						placeholder = "feet"
						autoComplete = "off"
						value = {this.state.name} 
					/>
					<input 
						onChange = {this.updateState}
						type = "text" 
						name = "inches" 
						placeholder = "inches"
						autoComplete = "off"
						value = {this.state.name} 
					/>
				</div>
			</div>
			<div className ='weight-wrapper'>
				<h3>Weight</h3>
				<div className ='bmr-input'>
					<input
						onChange = {this.updateState}
						type = "text" 
						name = "weight" 
						placeholder = "lbs"
						autoComplete = "off"
						value = {this.state.name} 
					/>
				</div>
			</div>
			<div className = 'age-wrapper'>
				<h3> Age </h3>
				<div className = 'bmr-input'>
					<input 
						onChange = {this.updateState}
						placeholder = "age"
						autoComplete = "off"
						type = 'text' 
						name = 'age' 
						value = {this.state.name}
					/>
				</div>
			</div>
			<div className = 'gender-wrapper'>
				<h3> Gender </h3>
				<div className = 'bmr-input'>
					<input 
						className = {this.state.gender === 'Male'? 'active' :'none'}
						onClick = {this.updateState}
						type = 'button' 
						name = 'gender' 
						value = "Male"
					/>
					<input 
						className = {this.state.gender ==='Female'? 'active' :'none'}
						onClick = {this.updateState}
						type = 'button' 
						name = 'gender' 
						value = "Female"
					/>
				</div>
			</div>
			<div className = 'submit-wrapper'>
				<input
					type = 'submit' 
					onClick = {this.handleSubmit}
					value = 'View Dashboard' 
				/>
			</div>
		</div>
	</form>

	calcBMR = () => {
		const { feet,inches,weight,age,gender,activityRate } = this.state;
		//to avoid invalid string parsing.
		let inch = (feet * 12 ) + (inches * 1);
		if(gender === 'Female'){
			return 655+(4.35*weight)+(4.7*inch)-(4.7*age)
		}else{
			return 66+(6.23*weight)+(12.7*inch)-(6.8*age)
		}
	}

	bmrReport = () => {
		const { bmr } = this.props.database.bmr;
		let BMR = Math.round(bmr);
		return <div>
			<p> *Based on the information you have provided, your estimated BMR is {BMR}. </p>
			<p> *All calculations and units are based off of the measurement grams. </p>
		</div>	
	}
	
	render(){
		const { bmr } = this.props.database;
		return<div>
			{ bmr? this.bmrReport() : this.bmrInput() }
		</div>
	}
}

BMR.propTypes = {
	database : PropTypes.object.isRequired,
	auth : PropTypes.object.isRequired,
	sendData : PropTypes.func.isRequired,
	addItem : PropTypes.func.isRequired,
	updateAuth : PropTypes.func,
}

const mapStateToProps = (state) => {
	return {
		database : state.database,
		auth : state.auth,
	}
}

const mapDispatchToProps = {
	sendData,
	addItem,
	updateAuth,
}

export default connect(mapStateToProps,mapDispatchToProps)(BMR);
