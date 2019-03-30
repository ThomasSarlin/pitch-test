import React,{Component} from 'react'
import Button from 'react-bootstrap/Button'
var upper={
    height:'40vh'
}
var lower={
    height:'40vh'
}
var filler={
    fontSize: '0.5em',
}
var btn={
	marginRight:'1vw',
	marginLeft: '1vw'
}

export default class Intro2 extends Component{
    keyDown(e){
		this.Keyboard.activateButton(e.key)
    }
    render(){
        return(
            <>
            <div style={upper}>
                <h1 onClick={this.props.incFunc}>Welcome to the pitch estimation test</h1>
                <p style={filler}>
                    When you have an estimated pitch ready, you have a set of different options. <br/>
                    All three options "Sure" "Unsure" and "Indeterminable" are different gradings of your estimation <br/>
                    to help further evaluate all estimations from this test. <br/><br/>
                    If you feel like aborting the test you can at any point just leave the page or press "Abort test",<br/>
                     all estimations are collected until the point you leave the page and no personal data is recorded.<br/>
                </p>
                <Button variant='success' onClick={this.props.incFunc}>Start test</Button>
            </div>
            <div style={lower}>
                <Button style={btn} size="lg" variant="success">Sure enstimation</Button>
			 	<Button style={btn} size="lg" variant="info" >Unsure estimation</Button>
			 	<Button style={btn}  size="lg" variant="warning" >Indeterminable</Button>
				<Button style={btn} size="lg" variant="danger" >Abort test</Button>
            </div>
            </>)
    }
}