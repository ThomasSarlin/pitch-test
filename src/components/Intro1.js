import React,{Component} from 'react'
import Keyboard from './Keyboard'
import Button from 'react-bootstrap/Button'
import EventListener from 'react-event-listener'
var upper={
    height:'40vh'
}
var lower={
    height:'40vh'
}
var filler={
    fontSize: '0.5em',
}

export default class Intro1 extends Component{
    keyDown(e){
		this.Keyboard.activateButton(e.key)
    }
    render(){
        return(
            <>
            <div style={upper}>
                <h1 onClick={this.props.incFunc}>Welcome to the pitch estimation test</h1>
                <p style={filler}>My name is Thomas and I need help estimating the pitch of 
                    different parts of drum-kits for my master thesis.<br/> I will be presenting multiple drum samples to you and it is your mission to estimate the pitch.
                    <br/><br />To your help you have a frequency controller with a corresponding sinusodial tone. <br/>
                    Up/Down arrow changes the frequency with +10/-10Hz and the Left/Right arrow with +1/-1 Hz. Press 's' to play the tone.<br/>
                    To play the sampled drum simply press 'd' or click the corresponding button.<br/><br/>
                    Our interest lies in musical notes so if you find it easier to<br/>
                    estimate the octave of the pitch it works as well. 

                    <br/>
                    </p>
                    <Button variant='success' onClick={this.props.incFunc}>Next step</Button>
            </div>
            <div style={lower}>
                <EventListener target="window" onKeyDown={this.keyDown.bind(this)}/>
                <Keyboard activateFunction={()=>{}} ref = {(keyboard)=>{this.Keyboard = keyboard}}/>
            </div>
            </>)
    }
}