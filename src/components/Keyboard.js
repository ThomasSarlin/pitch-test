import React, {Component} from 'react'
import Key from './Key.js'
var left={
    display:'inline-block',
    float:'left',
    marginRight:'500px'
}
var right={
    marginTop:'0vh',
    float:'right'
}

var gridContainer={
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    padding:'0px'
}
export default class Keyboard extends Component{
    activateButton(key){
        switch(key){
            case 's':
                this.sbtn.activateButton();
            break;
            case 'd':
                this.dbtn.activateButton();
                break;
            case 'ArrowLeft':
                this.larrbtn.activateButton();
                break;
            case 'ArrowRight':
                this.rarrbtn.activateButton();
                break;
            case 'ArrowUp':
                this.uarrbtn.activateButton();
                break;
            case 'ArrowDown':
                this.darrbtn.activateButton();
                break;
            default:
            break;
        }
    }
    render(){
        return(
            <div>
                <div style={left}>
                    <Key ekey="s" activateFunction={this.props.activateFunction} symbol="s" ref={(sbtn)=>this.sbtn=sbtn}/><p>Sine</p>
                    <Key ekey="d" activateFunction={this.props.activateFunction} symbol="d" ref={(dbtn)=>this.dbtn = dbtn}/><p>Drum</p>
                </div>
                <div style={right}>
                    <div style={gridContainer}>
                        <div></div>
                        <div>
                            <Key ekey="ArrowUp" activateFunction={this.props.activateFunction} symbol="&uarr;" ref={(uarrbtn)=>this.uarrbtn = uarrbtn}/>
                        </div>
                        <div></div><div></div>
                        <div>
                            <Key ekey="ArrowLeft" activateFunction={this.props.activateFunction}  symbol="&larr;" ref={(larrbtn)=>this.larrbtn = larrbtn}/>
                        
                            <Key ekey="ArrowDown" activateFunction={this.props.activateFunction} symbol="&darr;" ref={(darrbtn)=>this.darrbtn = darrbtn}/>
                        
                            <Key ekey="ArrowRight" activateFunction={this.props.activateFunction}  symbol="&rarr;" ref={(rarrbtn)=>this.rarrbtn = rarrbtn}/>
                        </div><div></div><div></div>
                        <div>
                            <p>Frequency Controller</p>
                        </div>
                       
                    </div>
                </div>
            </div>
        )
    }
}
			