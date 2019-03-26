import {Component} from 'react';

export default class DrumGen extends Component {
    
    togglePlay = (volume,url) => {
      if(url===null)return;
      var audio = new Audio(url)
      audio.volume=volume;
      audio.play();
    }
    
    render() {
      return (null);
    }
  }