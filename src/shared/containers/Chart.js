import React,{Component} from 'react';
import {Pie,Doughnut} from 'react-chartjs-2';
import '../styles/PieChart.css';

export const Chart = ({data}) =>  {
	const { pro,carbs,fats,title } = data;
	return <div className = 'daily-graph'>
		<h1> {title} </h1>
		<div id = 'pie-chart'>
			<Doughnut data = {data} />
		</div>
		<div>
			<span> Total calories consumption : {((pro + carbs) * 4) + (fats * 9)} </span>
		</div>
		<div>
			<span> Proteins : {pro} gm </span>
			<span> Carbohydrates : {carbs} gm </span>
			<span> Fats : {fats} gm </span>
		</div>
	</div>
}
