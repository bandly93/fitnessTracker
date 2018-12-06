import React from 'react';
import '../styles/FlashMessage.css';

export const FlashMessage = ({props}) => {
	const { message, status } = props;
	return <div className = {status === 'error'?'flash-error':'flash-success'}>
		<p>{ message }</p>
	</div>
}
