import React, { Component } from 'react';
import EventListener from 'react-event-listener';
import ToneGen from './ToneGen'
import DrumGen from './DrumGen'
import Keyboard from './Keyboard.js'
import Button from 'react-bootstrap/Button'
import '../App.css';



var btn={
	marginRight:'1vw',
	marginLeft: '1vw'
}
var upper={
	marginTop:'20vh',
    height:"30vh"
}
var lower={
	marginTop:'20vh',
	height:"28vh"
}
export default class Controller extends Component {
	constructor(props){
		super(props)
		this.state=({
			finish:false,
			sigVolume:0.15,
			drumVolume:0.5,
			drumInfo:null,
			currentDrum:null,
			frequency:100,
			currentIndex:0,
			loaded:false,
			message:"Loading next sample..."
		})
		this.setFrequencyAndPlay=this.setFrequencyAndPlay.bind(this);
	}
	componentDidMount(){

		var rootRef = this.props.database.ref("Drums")
		rootRef.on("value",(ss)=>{
			var data = []
			ss.forEach(cs=>{
				data.push(cs.val());
			})
			this.setState({
				drumInfo:this.shuffle(data)
			},()=>{
				this.setState({loaded:true},()=>{
					setTimeout(()=>this.setState({message:"Sample loaded, please estimate pitch"}),500)})
			})
		})
	}
	sigVolChange(e){
		this.setState({
			sigVolume:e.target.value
		});
	}
	drumVolChange(e){
		this.setState({
			drumVolume:e.target.value
		})
	}
	keyDown(e){
		if(!this.state.loaded)return;
		switch(e.key){
			case 'ArrowLeft':
				if(this.state.frequency-1>0)this.setFrequencyAndPlay(this.state.frequency-1)
			break;
			case 'ArrowRight':
				if(this.state.frequency+1<20000)this.setFrequencyAndPlay(this.state.frequency+1)
			break;
			case 'ArrowUp':
				if(this.state.frequency+10<20000)this.setFrequencyAndPlay(this.state.frequency+10)
			break;
			case 'ArrowDown':
				if(this.state.frequency-10>0)this.setFrequencyAndPlay(this.state.frequency-10)
			break;
			case 's':
				this.setFrequencyAndPlay(this.state.frequency);
			break;
			case 'd':
				this.ToneGenerator.silence();
				this.DrumGen.togglePlay(this.state.drumVolume,this.state.drumInfo[this.state.currentIndex].url);
			break;
			default:
			break;
		}
		this.Keyboard.activateButton(e.key);
	}
	shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
	sendBtn(){
		if(!this.state.loaded)return;
		if(this.state.currentIndex<this.state.drumInfo.length-1){
			this.setState({loaded:false},()=>{
				console.log(this.state.drumInfo[this.state.currentIndex].name)
				this.props.database.ref("Estimations").child(this.state.drumInfo[this.state.currentIndex].name).push({
					val:this.state.frequency,
					valEst:1
				},()=>{
					this.setState({
						currentIndex:this.state.currentIndex+1,
						message:"Loading next sample..",
					},()=>{setTimeout(()=>this.setState({loaded:true,message:"Sample loaded, please estimate pitch"}),500)})
				})
			})
		}
		else
			this.setState({
				message:"Thank you for participating!",
				finish:true
			})
		}
	passBtn(){
		if(!this.state.loaded)return;
		
		if(this.state.currentIndex<this.state.drumInfo.length-1){
			this.setState({loaded:false},()=>{
				this.props.database.ref("Estimations").child(this.state.drumInfo[this.state.currentIndex].name).push({
					val:this.state.frequency,
					valEst:'-1'
				},()=>{
					this.setState({
						currentIndex:this.state.currentIndex+1,
						message:"Loading next sample..",
					},()=>{setTimeout(()=>this.setState({loaded:true,message:"Sample loaded, please estimate pitch"}),500)})
				})
			})
		}
		else
			this.setState({
				message:"Thank you for participating!",
				finish:true
			})
	}
	abBtn(){
		if(!this.state.loaded)return;
		this.setState({
			message:"Thank you for participating!",
			finish:true
		})
	}
	unBtn(){
		if(!this.state.loaded)return;
		
		if(this.state.currentIndex<this.state.drumInfo.length-1){
			this.setState({loaded:false},()=>{
				this.props.database.ref("Estimations").child(this.state.drumInfo[this.state.currentIndex].name).push({
					val:this.state.frequency,
					valEst:'0'
				},()=>{
					this.setState({
						currentIndex:this.state.currentIndex+1,
						message:"Loading next sample..",
					},()=>{setTimeout(()=>this.setState({loaded:true,message:"Sample loaded, please estimate pitch"}),500)})
				})
			})
		}
		else
			this.setState({
				message:"Thank you for participating!",
				finish:true
			})
	}
	setFrequencyAndPlay(fz){
		this.setState({
			frequency:fz
		},()=>{
			this.ToneGenerator.playFz(this.state.sigVolume,fz);
		});
	}
	render() {
		return (
		 <div style={{minWidth:'852px',minHeight:'650px'}}>
		 	{this.state.finish?"":<h1 style={{position:'absolute',float:'left'}}>{(this.state.currentIndex+1)+"/"+(this.state.drumInfo?this.state.drumInfo.length:"")}</h1>}
			<div style={upper}>
				<h1>{this.state.message}</h1>
				{this.state.finish?"":<>
				<EventListener target="window" onKeyDown={this.keyDown.bind(this)}/>
				<header className="ToneGen-header">
					<h1>{this.state.frequency?this.state.frequency+" Hz":""}</h1>
				</header>
				<ToneGen ref={(ToneGenerator) => { this.ToneGenerator = ToneGenerator; }} />
				<DrumGen ref={(DrumGen) => {this.DrumGen = DrumGen}}/>
				<Keyboard activateFunction={this.keyDown.bind(this)} ref = {(keyboard)=>{this.Keyboard = keyboard}}/>
				<div style={{display:'block',marginTop:'25vh'}}>
					<p>DrumVolume: <input type="range" min="0" step="0.01" max="1" value={this.state.drumVolume} onChange={this.drumVolChange.bind(this)} className="slider"/></p>
					<p>SignalVolume: <input type="range" min="0.01" step="0.01" max="0.3" value={this.state.sigVolume} onChange={this.sigVolChange.bind(this)} className="slider"/></p>
				</div></>}
			</div>
			{this.state.finish?"":
			<div style={lower}>
			 	<Button style={btn} size="lg" variant="success" onClick={this.sendBtn.bind(this)}>Sure enstimation</Button>
			 	<Button style={btn} size="lg" variant="info" onClick={this.unBtn.bind(this)}>Unsure estimation</Button>
			 	<Button style={btn}  size="lg" variant="warning" onClick={this.passBtn.bind(this)}>Indeterminable</Button>
				<Button style={btn} size="lg" variant="danger" onClick={this.abBtn.bind(this)}>Abort test</Button>
        	</div>}
	    </div>
	 );
	}
}
