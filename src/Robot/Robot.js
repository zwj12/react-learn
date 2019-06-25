import React, { Component } from 'react';
import './Robot.css';
import View from './View/View';
import StatusBar from './StatusBar/StatusBar';

class Robot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operatingMode: "UNDEF",
      controllerState: "init",
      runningSpeed: "100",
      programState: "stopped",
      systemName: "",
      controllerName: "",
    };
    this.getRWServiceResourceSync("/rw/system?json=1", "systemName", "name")
    this.getRWServiceResourceSync("/ctrl/identity?json=1", "controllerName", "ctrl-name")
  }

  Subscription() {
    var rWebServiceRequest = new XMLHttpRequest();

    rWebServiceRequest.onreadystatechange = () => {
      //readyState: 0 - UNSENT, 1 - OPENed, 2 - HEADERS_RECEIVED, 3 - LOADING, 4 - DONE
      //status: 200, 201 - CREATED
      if (rWebServiceRequest.readyState == 4 && rWebServiceRequest.status == 201) {
        var strLocation = rWebServiceRequest.getResponseHeader("Location");
        console.log(rWebServiceRequest.responseText);

        //must add sub-protocol "robapi2_subscription"
        var ws = new WebSocket(strLocation, "robapi2_subscription");

        ws.onopen = () => {
          console.log("onopen");
        };

        ws.onmessage = (evt) => {
          function resolver(prefix) {
            switch (prefix) {
              default: return "http://www.w3.org/1999/xhtml";
            }
          }

          var received_msg = evt.data;
          console.log(received_msg);
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(received_msg, "text/xml");
          var nodes = xmlDoc.evaluate("//xmlns:li[@class='pnl-ctrlstate-ev']/xmlns:span", xmlDoc, resolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          if(nodes.singleNodeValue!=null){
            this.setState({
              controllerState: nodes.singleNodeValue.innerHTML,
            });
          }
          nodes = xmlDoc.evaluate("//xmlns:li[@class='pnl-opmode-ev']/xmlns:span", xmlDoc, resolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          if(nodes.singleNodeValue!=null){
            this.setState({
              operatingMode: nodes.singleNodeValue.innerHTML,
            });
          }
          nodes = xmlDoc.evaluate("//xmlns:li[@class='pnl-speedratio-ev']/xmlns:span", xmlDoc, resolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          if(nodes.singleNodeValue!=null){
            this.setState({
              runningSpeed: nodes.singleNodeValue.innerHTML,
            });
          }
          nodes = xmlDoc.evaluate("//xmlns:li[@class='rap-ctrlexecstate-ev']/xmlns:span", xmlDoc, resolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          if(nodes.singleNodeValue!=null){
            this.setState({
              programState: nodes.singleNodeValue.innerHTML,
            });
          } 
        };

        ws.onclose = () => {
          console.log("onclose");
        };

        ws.onerror = () => {
          console.log("onerror");
        };
      }
    }

    rWebServiceRequest.open("POST", "/subscription", true);
    rWebServiceRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    var strEntityBody = "resources=1&1=/rw/panel/ctrlstate&1-p=0"    
      + "&resources=2&2=/rw/panel/opmode&2-p=0"
      + "&resources=3&3=/rw/panel/speedratio&3-p=0"
      + "&resources=4&4=/rw/rapid/execution;ctrlexecstate&4-p=0"
      ;
    rWebServiceRequest.send(strEntityBody);
  }

  componentDidMount() {
    this.Subscription();
  }

  componentWillUnmount() {
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
      <div className="Robot">
        <StatusBar operatingMode={this.state.operatingMode}
          controllerState={this.state.controllerState}
          systemName={this.state.systemName}
          controllerName={this.state.controllerName}
          programState={this.state.programState}
          runningSpeed={this.state.runningSpeed} />
        <View />
        Robot
        </div>
    );
  }
}

export default Robot;