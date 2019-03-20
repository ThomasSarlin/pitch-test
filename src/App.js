import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tone from 'tone';

class App extends Component {
	constructor(props){
		super(props)
		this.state=({
			frequency:440,
			play:true,
			oscillator:null,
			synth : new Tone.Synth().toMaster()
		})
	}
	something(){
		// create web audio api context
			if(!this.state.oscillator){
				this.setState({
					audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
				},()=>{
					this.setState({
						oscillator:this.state.audioCtx.createOscillator()
					},()=>{	
						this.state.oscillator.type = 'sine';
						this.state.oscillator.connect(this.state.audioCtx.destination);
					})
				})
			}
			// create Oscillator node
	}
	valueChange(e){
		console.log(e.target.value)

		this.setState({
			frequency:e.target.value
		},()=>{
			this.state.oscillator.frequency.setValueAtTime(this.state.frequency, this.state.audioCtx.currentTime); // value in hertz
			if(this.state.play){
				this.state.oscillator.start()
				this.setState({
					play:!this.state.play
				})
			}
		})
	}
	render() {
		return (
		 <div className="App">
	      <header className="App-header">
	      <button onClick={this.something.bind(this)}>BATTAN</button>
				<input type="range" min="440" max="1600" value={this.state.frequency} onChange={this.valueChange.bind(this)} className="slider"/>
	     </header>
	   </div>
	 );
	}
}

export default App;
