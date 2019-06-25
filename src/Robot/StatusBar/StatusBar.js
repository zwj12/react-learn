import React, { Component } from 'react';
import './StatusBar.css';

class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      operatingMode: "UNDEF",
      controllerState: "init",
      runningSpeed: "100",
      programState: "stopped",
      systemName: "",
      controllerName: "",
    };
  }

  componentDidMount() {
    //console.log("componentDidMount by StatusBar");
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    //this.getOperationMode();
    //this.getControllerState();
    //console.log("tick by StatusBar");
    //this.getRWServiceResourceSync("/rw/panel/ctrlstate?json=1", "controllerState", "ctrlstate")
    //this.getRWServiceResourceSync("/rw/panel/opmode?json=1", "operatingMode", "opmode")
    //this.getRWServiceResourceSync("/rw/panel/speedratio?json=1", "runningSpeed", "speedratio")
    //this.getRWServiceResourceSync("/rw/rapid/execution?json=1", "programState", "ctrlexecstate")
    //this.getRWServiceResourceSync("/rw/system?json=1", "systemName", "name")
    //this.getRWServiceResourceSync("/ctrl/identity?json=1", "controllerName", "ctrl-name")

    this.setState({
      date: new Date()
    });
  }

  getOperationMode() {
    var rwServiceResource = new XMLHttpRequest();
    rwServiceResource.onreadystatechange = () => {
      if (rwServiceResource.readyState === 4) {
        if (rwServiceResource.status === 200) {
          var obj = JSON.parse(rwServiceResource.responseText);
          var service = obj._embedded._state[0];
          this.setState({
            operatingMode: service.opmode
          });
        } else {
          //alert("Error " + rwServiceResource.status + ": " + rwServiceResource.statusText);
          console.log("Error " + rwServiceResource.status + ": " + rwServiceResource.statusText);
        }
      }
    }
    rwServiceResource.open("GET", "/rw/panel/opmode?json=1", true);
    rwServiceResource.send();
  }

  getControllerState() {
    var rwServiceResource = new XMLHttpRequest();
    rwServiceResource.onreadystatechange = () => {
      if (rwServiceResource.readyState == 4 && rwServiceResource.status == 200) {
        var obj = JSON.parse(rwServiceResource.responseText);
        var service = obj._embedded._state[0];
        this.setState({
          controllerState: service.ctrlstate
        });
      }
    }
    rwServiceResource.open("GET", "/rw/panel/ctrlstate?json=1", true);
    rwServiceResource.send();
  }

  getRWServiceResource(resource, key, value) {
    var rwServiceResource = new XMLHttpRequest();
    rwServiceResource.onreadystatechange = () => {
      if (rwServiceResource.readyState == 4 && rwServiceResource.status == 200) {
        var obj = JSON.parse(rwServiceResource.responseText);
        var service = obj._embedded._state[0];
        this.setState({
          [key]: service[value]
        });
      }
      console.log(resource + ", "+ key +", "+ value + ", readyState:" + rwServiceResource.readyState + ", status=" + rwServiceResource.status + "");
    }
    rwServiceResource.open("GET", resource, true);
    rwServiceResource.send();
  }

  getRWServiceResourceSync(resource, key, value) {
    var rwServiceResource = new XMLHttpRequest();
    rwServiceResource.open("GET", resource, false);
    rwServiceResource.send();
    if (rwServiceResource.status == 200) {
      var obj = JSON.parse(rwServiceResource.responseText);
      var service = obj._embedded._state[0];
      //console.log(service);
      this.setState({
        [key]: service[value]
      });
      //console.log(resource + ", "+ key +", "+ value + ", readyState:" + rwServiceResource.readyState + ", status=" + rwServiceResource.status + "");
    }
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
            <td>{this.props.systemName}({this.props.controllerName})</td>
            <td>{this.props.programState}</td>
            <td>{this.props.runningSpeed}%</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default StatusBar;