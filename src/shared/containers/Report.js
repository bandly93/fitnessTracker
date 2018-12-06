import React , {Component, Fragment} from 'react';
import { Chart } from './Chart';
import BMR from '../components/BMR';

export const Report = ({data}) => {
	return <Fragment>
		<Chart data = {data}/>
		<BMR />
	</Fragment>
}
