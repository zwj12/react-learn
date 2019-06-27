import React, { Component } from 'react';
import './View.css';

class View extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="View">
        {this.props.layerParameter.toString()}
      </div>
    );
  }
}

export default View;