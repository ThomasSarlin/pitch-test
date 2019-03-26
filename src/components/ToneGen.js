import React, { Component } from 'react';
import EventListener from 'react-event-listener';
import './BufferLoader.js'
import '../App.css';

var style=({
    
});
class ToneGen extends Component {
	constructor(props){
		super(props)
		this.state=({
			volume:0.8,
			frequency:100,
			play:true,
			oscillator:null,
			gainNode:null,
            lastAction:0,
            mute:false
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
					})
				})
			}
			// create Oscillator node
            setInterval(this.checkActions.bind(this),250);
    }
    checkActions(){
		if(this.state.gainNode && this.state.lastAction!==0){
            if(this.state.lastAction+1<this.state.audioCtx.currentTime){
                this.setState({
                    lastAction:0
                },()=>{
	    		    this.state.gainNode.gain.exponentialRampToValueAtTime(0.0001,this.state.audioCtx.currentTime+0.3);
                });
            }
        }
    }
	fzChange(e){
		console.log(e.target.value)

		this.setState({
            frequency:e.target.value,
            lastAction:this.state.audioCtx.currentTime,
		},()=>{
			this.state.gainNode.gain.exponentialRampToValueAtTime(this.state.volume, this.state.audioCtx.currentTime+0.3);
			this.state.oscillator.frequency.setValueAtTime(this.state.frequency, this.state.audioCtx.currentTime); // value in hertz
			if(this.state.play){
                this.setState({
                    play:!this.state.play
                })
				this.state.oscillator.start();
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
	}
	playDrum(){
	}
	keyDown(e){
        console.log(e.key)
		
		switch(e.key){
			case 'ArrowLeft':
				if(this.state.frequency-1>0)this.fzChange({target:{value:this.state.frequency-1}})
			break;
			case 'ArrowRight':
				if(this.state.frequency+1<20000)this.fzChange({target:{value:this.state.frequency+1}})
			break;
			case 'ArrowUp':
				if(this.state.frequency-10>0)this.fzChange({target:{value:this.state.frequency+10}})
			break;
			case 'ArrowDown':
				if(this.state.frequency+10<20000)this.fzChange({target:{value:this.state.frequency-10}})
			break;
			case 's':
				this.fzChange({target:{value:this.state.frequency}});
			break;
			case 'd':
				this.playDrum();
			break;
		}
	}
	render() {
		return (

		 <div style={style} className="ToneGen">
	    	<EventListener target="window" onKeyDown={this.keyDown.bind(this)}/>

			<header className="ToneGen-header">
				<h1>{this.state.frequency?this.state.frequency:""}</h1>
				<input type="range" min="0.001" step="0.1" max="1.0" value={this.state.volume} onClick={this.volChange.bind(this)} onChange={this.volChange.bind(this)} className="slider"/>
				{/*<input type="range" min="40" max="120" value={this.state.frequency} onClick={this.fzChange.bind(this)} onChange={this.fzChange.bind(this)} className="slider"/>*/}
	     	</header>
	   </div>
	 );
	}
}
  
export default ToneGen;
