export const updateState = (e) => {
	const { name , value } = e.target;
	this.setState({[name] : value });
}

export const mapForm = (inputData) => {
	return inputData.map( f => {
		<input
			key = {f.name}
			type = {f.type}
			name = {f.name}
			value = {this.state.name}
			placeholder = {f.placeholder}
			onChange = {this.updateState}
		/>
	})
}

const button = () => {
	return <button onClick = {this.handleSubmit}> Submit </button>
} 

module.exports = {
	updateState,
	mapForm,
	button,
}
