const SET_FLASH = 'SET_FLASH';
const REMOVE_FLASH = 'REMOVE_FLASH';

let initialState = {
	status : null,
	message : null,
}

export const setFlashMessage = (message) => {
	return{
		type : SET_FLASH,
		message
	}
} 

export const removeFlash = () => {
	return {
		type : REMOVE_FLASH,
	}
}

export const flashReducer = (state = initialState , action) => {
	switch(action.type){
		case SET_FLASH :
			return {
				...state,
				...action.message
			}
		case REMOVE_FLASH:
			return {
				...state,
				...{message:null,status:null}
			}
		default :
			return state;
	}
}

export default flashReducer;
