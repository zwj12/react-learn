import React, { Component } from 'react';
import './StatusBar.css';

class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div className="StatusBar">
        <table>
          <tr>
            <td>{this.props.operatingMode}</td>
            <td>{this.props.controllerState}</td>
            <td>{this.state.date.toLocaleTimeString()}</td>
          </tr>
          <tr>
            <td>{this.props.systemName}</td>
            <td>{this.props.programState}</td>
            <td>{this.props.runningSpeed}%</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default StatusBar;