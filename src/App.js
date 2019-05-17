import React, { Component } from 'react';
import './App.css';
import Intro1 from './components/Intro1'
import DisplayResult from './components/DisplayResult'
import Intro2 from './components/Intro2'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import Controller from './components/Controller';
var footer={
	fontSize:'11px'
}
export default class App extends Component {
	constructor(){
		super();
		this.state={
			case:4
		}
	}
	inc(){
		this.setState({
			case:this.state.case+1
		})
	}
	showresult(){
		this.setState({
			case:4
		})
	}
	render() {
		return (
			<>
			<BrowserView device={isBrowser}>
				<div className="App">
					<header className="App-header">
						{this.state.case===1?<Intro1 incFunc={this.inc.bind(this)} />:""}
						{this.state.case===2?<Intro2 incFunc={this.inc.bind(this)} />:""}
						{this.state.case===3?<Controller database={this.props.database}/>:""}
						{this.state.case===4?<DisplayResult database={this.props.database}/>:""}
						<footer style={footer}>Made by Thomas Sarlin, thomas@greyleaf.se</footer>
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
