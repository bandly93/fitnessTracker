import React from 'react';

export const Title = ({props}) => {
	const {user,text} = props;
	let upperCaseName = user.firstName[0].toUpperCase() + user.firstName.slice(1);
	return<div>
		<h1> Hello, {upperCaseName}</h1>
		<h2> {text} </h2>
	</div>
}
