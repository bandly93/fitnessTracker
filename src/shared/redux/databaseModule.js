const ADD_TO_DATABASE = 'ADD_TO_DATABASE';

let initialState = {
	array : [],
}

export const addItem = (data) => {
	return {
		type : ADD_TO_DATABASE,
		data
	}
}

export const databaseReducer = (state = initialState, action) => {
	switch(action.type){
		case ADD_TO_DATABASE:
			return {...state,...action.data};
		default:
			return state;
	}
}

export default databaseReducer;
