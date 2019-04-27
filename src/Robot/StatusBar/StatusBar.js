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
    this.getDataFromWebServiceAsyc();
    this.setState({
      date: new Date()
    });
  }

  getDataFromWebServiceAsyc() {
    var rwServiceResource = new XMLHttpRequest();
    rwServiceResource.onreadystatechange = function () {
      if (rwServiceResource.readyState === 4) {
        if (rwServiceResource.status === 200) {
          var result = rwServiceResource.responseText;
          console.log(result);
        } else {
          alert("Error " + rwServiceResource.status + ": " + rwServiceResource.statusText);
        }
      }
    }
    rwServiceResource.open("GET", "http://localhost:8680/rw/panel/opmode", true);
    rwServiceResource.send();
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