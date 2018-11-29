require('es6-promise').polyfill();
require('isomorphic-fetch');

export const sendData = (url,method,data,actFunc) => {
	return(dispatch) => {
		fetch(url, {
    	method,
    	credentials: 'same-origin',
    	headers: { 'Content-Type': 'application/json'},
    	body: JSON.stringify(data),
		})
   	.then(res => res.json())
		.then(data =>{
			if(actFunc){
				actFunc(data)
			}
		})
		.catch(err => console.error(err));
	}
}

export const authFetch = (url,method,data,authFunc) => {
	return(dispatch) => {
		fetch(url,{
			method,
			credentials : 'same-origin',
			headers : { 'Content-Type' : 'application/json' },
			body : JSON.stringify(data),
		})
		.then (res => res.json())
		.then (data => {
			//sign token to localstorage before calling authFunc
			if(data.token != null){
				localStorage.setItem('JWT',data.token);
			}
			authFunc(data);
		})
		.catch(err => {
			console.error(err);
		})
	}
}

export const getData = (url,actFunc) => {
	return(dispatch) => {
		fetch(url,{credentials: 'same-origin'})
		.then(res => res.json())
		.then(data => {
			if(actFunc){
				actFunc(data)
			}
		})
		.catch(err => console.error(err));
	}
}
