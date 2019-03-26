import React, { Component } from 'react';
import './App.css';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import Controller from './components/Controller';
export default class App extends Component {
	render() {
		return (
			<>
			<BrowserView device={isBrowser}>
				<div className="App">
					<header className="App-header">
						<Controller />
					</header>
				</div>
			</BrowserView>
			<MobileView device={isMobile}>
			<div className="App">
				<header className="App-header">
					<h1>Sorry, not available on mobile devices</h1>
					<p>thomas@greyleaf.se</p>
				</header>
			</div>
			</MobileView>
			</>
		);
	}
}