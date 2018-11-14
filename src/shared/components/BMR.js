import  React ,{ Component} from 'react';

class BMR extends Component{
	constructor(props){
		super(props)
		this.state = {
			feet : '',
			inches : '',
			weight : '',
			age : '',
			gender: '',
		}
	}

	updateState = (e) =>{
		const {name, value} = e.target;
		this.setState({[name]:value});
	}	
	
	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
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
		if(women){
			return 655+(4.35*lbs)+(4.7*inches)-(4.7*age)*activityRate;
		}else{
			return 66+(6.23*lbs)+(12.7*inches)-(6.8*age)*activityRate;
		}
	}
	render(){
		return<div>
			{this.bmrInput()}
		</div>
	}
}

export default BMR;
