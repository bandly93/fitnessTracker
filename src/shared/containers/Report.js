import React , {Component, Fragment} from 'react';
import { Chart } from './Chart';
import BMR from '../components/BMR';
import InputBox from '../components/InputBox';
import '../styles/Report.css';

export const Report = ({data}) => {
	return <div id = 'report'>
		<Chart data = {data}/>
		<InputBox />
	</div>
}
