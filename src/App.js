import React, { Component } from 'react';
import './App.css';
import Controller from './components/Controller';
export default class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Controller />
				</header>
			</div>
		);
	}
}