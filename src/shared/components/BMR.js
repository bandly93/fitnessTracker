import  React ,{ Component} from 'react';
import { sendData } from '../redux/fetchThunk.js';
import { addItem } from '../redux/databaseModule.js';
import { connect } from 'react-redux';

class BMR extends Component{
	constructor(props){
		super(props)
		this.state = {
			feet : 0,
			inches : 0,
			weight : 0,
			age : 0,
			gender: 0,
			activityRate: 0.75,
			bmr : 0,
		}
	}

	updateState = (e) =>{
		const {name, value} = e.target;
		this.setState({[name]:value});
	}	
	
	handleSubmit = async (e) => {
		e.preventDefault();
		this.setState({bmr: await this.calcBMR()});
		const { sendData , addItem } = this.props;
		let bmrInfo = {...this.state};
		bmrInfo.userId = this.props.auth.user.userId;	
		sendData('/postgres/addBmr','POST',bmrInfo,addItem);	
	}

	bmrInput = () => <form>
		<div>
			<div className = 'height-wrapper'>	
				<h3>Height</h3>
				<div>
					<input 
						onChange = {this.updateState}
						type = "text"  
						name = "feet" 
						value = {this.state.feet} />
					ft
					<input 
						onChange = {this.updateState}
						type = "text" 
						name = "inches" 
						value = {this.state.inches} />
					in
				</div>
			</div>
			<div className ='weight-wrapper'>
				<h3>Weight</h3>
				<div>
					<input
						onChange = {this.updateState}
						type = "text" 
						name = "weight" 
						value = {this.state.weight} />
					lbs
				</div>
			</div>
			<div className = 'age-wrapper'>
				<h3> Age </h3>
				<div>
					<input 
						onChange = {this.updateState}
						type = 'text' 
						name = 'age' 
						value = {this.state.age}/>
				</div>
			</div>
			<div className = 'gender-wrapper'>
				<h3> Gender </h3>
				<div>
					<input 
						className = {this.state.gender === 'Male'? 'active' :'none'}
						onClick = {this.updateState}
						type = 'button' 
						name = 'gender' 
						value = "Male"/>
					<input 
						className = {this.state.gender ==='Female'? 'active' :'none'}
						onClick = {this.updateState}
						type = 'button' 
						name = 'gender' 
						value = "Female"/>
				</div>
			</div>
			<div className = 'submit-wrapper'>
				<input type = 'submit' onClick = {this.handleSubmit} />
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
		return <div>
			<h1> Your estimated BMR is {this.props.database.bmr.bmr}. </h1>
		</div>	
	}
	
	render(){
		const { bmr } = this.props.database;
		return<div>
			{bmr? this.bmrReport() : this.bmrInput()}
		</div>
	}
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
}

export default connect(mapStateToProps,mapDispatchToProps)(BMR);
