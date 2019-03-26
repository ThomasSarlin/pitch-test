import React, { Component } from 'react';
import './App.css';
import ToneGen from './components/ToneGen.js';
class App extends Component {
	constructor(props){
		super(props)
		this.state=({
			fz:100,
			volume:0.8
		})
	}
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<ToneGen 
						fz={this.state.frequency}
						gain={this.state.gain} />
				</header>
			</div>
		);
	}
}
function BufferLoader(context, urlList, callback) {
	this.context = context;
	this.urlList = urlList;
	this.onload = callback;
	this.bufferList = new Array();
	this.loadCount = 0;
  }
  
  BufferLoader.prototype.loadBuffer = function(url, index) {
	// Load buffer asynchronously
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";
  
	var loader = this;
  
	request.onload = function() {
	  // Asynchronously decode the audio file data in request.response
	  loader.context.decodeAudioData(
		request.response,
		function(buffer) {
		  if (!buffer) {
			alert('error decoding file data: ' + url);
			return;
		  }
		  loader.bufferList[index] = buffer;
		  if (++loader.loadCount == loader.urlList.length)
			loader.onload(loader.bufferList);
		},
		function(error) {
		  console.error('decodeAudioData error', error);
		}
	  );
	}
  
	request.onerror = function() {
	  alert('BufferLoader: XHR error');
	}
  
	request.send();
  }
  
  BufferLoader.prototype.load = function() {
	for (var i = 0; i < this.urlList.length; ++i)
	this.loadBuffer(this.urlList[i], i);
  }
  
export default App;
