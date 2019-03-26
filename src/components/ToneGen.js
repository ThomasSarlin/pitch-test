
import { Component } from 'react';

export default class ToneGen extends Component{
    constructor(props){
        super(props);
        this.state=({
            lastAction:0,
			play:true,
			oscillator:null,
			gainNode:null,
            mute:false
        });
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
                        this.state.gainNode.gain.exponentialRampToValueAtTime(0.0001,this.state.audioCtx.currentTime)
                        console.log("DONE")
					})
				})
			}
			// create Oscillator node
            setInterval(this.checkActions.bind(this),250);
    }
    
    silence(){
            this.state.gainNode.gain.exponentialRampToValueAtTime(0.0001,this.state.audioCtx.currentTime+0.1);
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
    playFz(volume,frequency){
        this.state.gainNode.gain.exponentialRampToValueAtTime(volume, this.state.audioCtx.currentTime+0.3);
            this.state.oscillator.frequency.setValueAtTime(frequency, this.state.audioCtx.currentTime); // value in hertz
            this.setState({lastAction:this.state.audioCtx.currentTime})
			if(this.state.play){
                this.setState({
                    play:!this.state.play
                })
				this.state.oscillator.start();
			}	
    }
    render(){return (null);}
}