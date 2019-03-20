import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tone from 'tone';

class App extends Component {
	constructor(props){
		super(props)
		this.state=({
			volume:0.8,
			frequency:100,
			play:true,
			oscillator:null,
			gainNode:null,
			synth : new Tone.Synth().toMaster()
		})
	}
	componentDidMount(){
		// create web audio api context
			if(!this.state.oscillator){
				this.setState({
					audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
				},()=>{
					this.setState({
						oscillator:this.state.audioCtx.createOscillator(),
						gainNode: this.state.audioCtx.createGain()
					},()=>{	
						this.state.oscillator.connect(this.state.gainNode);
						this.state.gainNode.connect(this.state.audioCtx.destination);
						//this.state.oscillator.start();
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
			this.state.gainNode.gain.setValueAtTime(this.state.volume, this.state.audioCtx.currentTime);
			this.state.oscillator.frequency.setValueAtTime(this.state.frequency, this.state.audioCtx.currentTime); // value in hertz

			if(this.state.play){
				this.state.oscillator.start();

				//this.state.oscillator.stop(this.state.audioCtx.currentTime+1);
				this.setState({
					play:!this.state.play
				})
			}	
		})
	}
	volChange(e){
		console.log(e.target.value)
		this.setState({
			volume:e.target.value
		},()=>{
			this.state.gainNode.gain.setValueAtTime(this.state.volume, this.state.audioCtx.currentTime);
		});
	}
	release(e){
		console.log("WHAT")
		if(this.state.gainNode!=null){
			this.state.gainNode.gain.setValueAtTime(0.0001,this.state.audioCtx.currentTime+1);
		}
	}
	keyDown(e){
		console.log(e.key)
	}
	render() {
		return (
		 <div className="App" onKeyDown={this.keyDown.bind(this)}>
	      <header className="App-header">
				<input type="range" min="0.0" step="0.1" max="1.0" value={this.state.volume} onClick={this.volChange.bind(this)} onChange={this.volChange.bind(this)} className="slider"/>
				<input onmouseup={this.release.bind(this)} type="range" min="40" max="120" value={this.state.frequency} onClick={this.valueChange.bind(this)} onChange={this.valueChange.bind(this)} className="slider"/>
	     </header>
	   </div>
	 );
	}
}

export default App;
