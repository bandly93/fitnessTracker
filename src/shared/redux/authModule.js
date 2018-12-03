let initialState = {
	'redirectTo' : null,
	'user' : {},
	'message' : null,
	'isLogged' : false,
	'status' : null,
	'token' : null,
	'auth' : false,
}

export const REDIRECT_PATH = 'REDIRECT_PATH';
export const UPDATE_USER = 'UPDATE_USER';
export const IS_LOGGED = 'IS_LOGGED';
export const NOT_LOGGED = 'NOT_LOGGED';
export const UPDATE_AUTH = 'UPDATE_AUTH';
export const RESET_AUTH = 'RESET_AUTH';
export const RESET_FLASH = 'RESET_FLASH'

export const resetFlash = () => {
	return {
		type : RESET_FLASH,
	}
}

export const resetAuth = () => {
	return{
		type : RESET_AUTH,
	}
}

export const redirectPath = (path) => {
	return{
		type : REDIRECT_PATH,
		path,
	}
}

export const updateUser = (user) =>{
	return{
		type : UPDATE_USER,
		user,
	}
}

export const isLogged = () =>{
	return {
		type : IS_LOGGED,
	}
}

export const notLogged = () =>{
	return{
		type : NOT_LOGGED,
	}
}

export const updateAuth = (data) => {
	return {
		type  : UPDATE_AUTH,
		data,
	}
}

export const authReducer = (state = initialState,action) =>{
	switch(action.type){
		case UPDATE_AUTH:
			return {
				...state,
				...action.data,
			}
		case REDIRECT_PATH :
			return{
				...state,
				...action.path,
			}
		case UPDATE_USER :
			return {
				...state,
				...action.user,
			}
		case IS_LOGGED :
			return{
				...state,
				...{isLogged : true},
			}
		case NOT_LOGGED :
			return {
				...state,
				...{isLogged: false},
			}
		case RESET_AUTH : 
			return initialState;
		case RESET_FLASH :
			return {
				...state, 
				...{status: null,message :null}
			}
		default :
			return state;
	}
}
export default authReducer;
