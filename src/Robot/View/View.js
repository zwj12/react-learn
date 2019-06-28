import React, { Component } from 'react';
import './View.css';
import LayerParameter from '../../Ebara/LayerParameter';

class View extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    // console.log(this.props.layerParameters);
    const listItems = this.props.layerParameters.map((layerParameter, index) =>
      <LayerParameter layerParameter={layerParameter} index={index} />
    );

    return (
      <div className="View">
        <table>
          <caption>LayerParameters</caption>
          <tr>
            <th>index</th>
            <th>numWorkAngleDeclination</th>
          </tr>
          {listItems}
        </table>
      </div>
    );
  }
}

export default View;