import React from 'react';
import '../styles/FlashMessage.css';

export const FlashMessage = ({status,message}) => {
	return <div id = 'flash-message' className = {status === 'error'?'flash-error':'flash-success'}>
		<p>{ message }</p>
	</div>
}

export default FlashMessage;
