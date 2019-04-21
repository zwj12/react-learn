import React, { Component } from 'react';
import './Robot.css';
import View from './View/View';
import StatusBar from './StatusBar/StatusBar';

class Robot extends Component {
    render() {
      return (
        <div className="Robot">
          <StatusBar />
          <View />
          Robot
        </div>
      );
    }
  }
  
  export default Robot;