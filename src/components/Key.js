import React, {Component} from 'react';
var buttonstyle={
    display:'inline-block',
    width:50,
    height:50,
    borderStyle:'solid',
    borderWidth:'1px',
    marginRight:'10px'
}
var symbolstyle={
    text:'10px',
    marginTop:'0px',
    userSelect:'none'
}
export default class Key extends Component {
    constructor(){
        super();
        this.state={
            color:'white'
        }
    }
    clickFunction(){
        this.activateButton();
        this.props.activateFunction({key:this.props.ekey});
    }
    activateButton(){
        this.setState({
            color:'orange'
        },()=>setTimeout(()=>this.setState({color:'white'}),100));
    }

    render(){
        return(
            <div style={{...buttonstyle,color:this.state.color}}  onClick={this.clickFunction.bind(this)}>
                <p style={{...symbolstyle,color:this.state.color}}>{this.props.symbol}</p>
            </div>
            )
    }
}