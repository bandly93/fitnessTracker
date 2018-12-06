const ADD_TO_DATABASE = 'ADD_TO_DATABASE';
const RESET_REDUX = 'RESET_REDUX';

let initialState = {
	foodItems : [],
	bmr : {},
	dailyItems : [],
}

export const addItem = (data) => {
	return {
		type : ADD_TO_DATABASE,
		data
	}
}

export const resetDB = () => {
	return{
		type : RESET_REDUX,
	}
}

export const databaseReducer = (state = initialState, action) => {
	switch(action.type){
		case ADD_TO_DATABASE:
			return {...state,...action.data};
		case RESET_REDUX:
			return initialState;
		default:
			return state;
	}
}

export default databaseReducer;
