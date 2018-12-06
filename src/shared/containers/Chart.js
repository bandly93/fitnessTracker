import React,{Component} from 'react';
import {Pie,Doughnut} from 'react-chartjs-2';
import '../styles/Chart.css';

export const Chart = ({data}) =>  {
	const { pro,carbs,fats,title,count } = data;
	return <div className = 'daily-graph'>
		<h1> {title} </h1>
		<div id = 'pie-chart'>
			<Doughnut data = {data} />
		</div>	
		<div>
			<span> Proteins : {pro} </span>
			<span> Carbohydrates : {carbs} </span>
			<span> Fats : {fats} </span>
		</div>	
		<div>
			<span> Total calorie consumption : {((pro + carbs) * 4) + (fats * 9)} </span>
		</div>
	</div>
}
