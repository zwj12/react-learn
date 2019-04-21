import React, { Component } from 'react';
import './Robot.css';
import View from './View/View';
import StatusBar from './StatusBar/StatusBar';

class Robot extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="Robot">
        <StatusBar operatingMode="Manual" controllerState="Motors Off" systemName="systemName" controllerName="controllerName" programState="Stopped" runningSpeed="100" />
        <View />
        Robot
        </div>
    );
  }
}

export default Robot;