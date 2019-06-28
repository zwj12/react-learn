import Circle from './Circle';
import WebService from '../Robot/WebService';
import React, { Component } from 'react';
import './LayerParameter.css';

class LayerParameter extends Component {
    constructor(props) {
        super(props);
        this.task = "T_ROB1";
        this.module = "GlobalDataModule";
        this.numLayerNo = 0;
        this.numWorkAngleDeclination = 0;
        this.rCircleOffsetX = new Circle();
        this.rCircleOffsetY = new Circle();
        this.rCircleRotationX = new Circle();
        this.rCircleRotationY = new Circle();
        this.rCircleRotationZ = new Circle();
        this.strWeldProcedureID = "";
    }

    //[0,[1,3,1,6,1],[-5,3,-5,3,1],[0,0,0,0,1],[0,-15,0,-15,1],[0,0,0,0,1],"s7j46w0-0"];
    toString() {
        var strLayerParameter = "[" + this.numWorkAngleDeclination
            + ", " + this.rCircleOffsetX.toString()
            + ", " + this.rCircleOffsetY.toString()
            + ", " + this.rCircleRotationX.toString()
            + ", " + this.rCircleRotationY.toString()
            + ", " + this.rCircleRotationZ.toString()
            + "," + "\"" + this.strWeldProcedureID + "\"]";
        // console.log(strLayerParameter);
        return strLayerParameter;
    }

    parse(strLayerParameter) {
        var numStartIndex = 0;
        var numStopIndex = 0;

        // console.log(strLayerParameter);

        numStartIndex = strLayerParameter.indexOf("[") + 1;
        numStopIndex = strLayerParameter.indexOf(",", numStartIndex);
        this.numWorkAngleDeclination = strLayerParameter.substring(numStartIndex, numStopIndex);

        numStartIndex = numStopIndex + 1;
        numStopIndex = strLayerParameter.indexOf("]", numStartIndex);
        numStopIndex = numStopIndex + 1;
        this.rCircleOffsetX.parse(strLayerParameter.substring(numStartIndex, numStopIndex))

        numStartIndex = numStopIndex + 1;
        numStopIndex = strLayerParameter.indexOf("]", numStartIndex);
        numStopIndex = numStopIndex + 1;
        this.rCircleOffsetY.parse(strLayerParameter.substring(numStartIndex, numStopIndex))

        numStartIndex = numStopIndex + 1;
        numStopIndex = strLayerParameter.indexOf("]", numStartIndex);
        numStopIndex = numStopIndex + 1;
        this.rCircleRotationX.parse(strLayerParameter.substring(numStartIndex, numStopIndex))

        numStartIndex = numStopIndex + 1;
        numStopIndex = strLayerParameter.indexOf("]", numStartIndex);
        numStopIndex = numStopIndex + 1;
        this.rCircleRotationY.parse(strLayerParameter.substring(numStartIndex, numStopIndex))

        numStartIndex = numStopIndex + 1;
        numStopIndex = strLayerParameter.indexOf("]", numStartIndex);
        numStopIndex = numStopIndex + 1;
        this.rCircleRotationZ.parse(strLayerParameter.substring(numStartIndex, numStopIndex))

        numStartIndex = numStopIndex + 1;
        numStartIndex = strLayerParameter.indexOf("\"", numStartIndex) + 1;
        numStopIndex = numStartIndex;
        while (numStopIndex < strLayerParameter.length) {
            numStopIndex = strLayerParameter.indexOf("\"", numStopIndex);
            if (strLayerParameter.charAt(numStopIndex + 1) != "\"") {
                break;
            } else {
                numStopIndex = numStopIndex + 2;
            }
        }
        this.strWeldProcedureID = strLayerParameter.substring(numStartIndex, numStopIndex);
        numStopIndex = strLayerParameter.indexOf(",", numStopIndex + 1);
    }

    getDataFromWebServiceSync(numLayerNo) {
        this.numLayerNo = numLayerNo;
        var rwServiceResource = new XMLHttpRequest();
        if (this.numLayerNo < 10) {
            rwServiceResource.open("GET", "/rw/rapid/symbol/data/RAPID/T_ROB1/GlobalDataModule/rLayerParameter0" + numLayerNo + "?json=1", false);
        } else {
            rwServiceResource.open("GET", "/rw/rapid/symbol/data/RAPID/T_ROB1/GlobalDataModule/rLayerParameter" + numLayerNo + "?json=1", false);
        }
        rwServiceResource.send();
        if (rwServiceResource.status == 200) {
            // console.log(rwServiceResource.responseText);
            var obj = JSON.parse(rwServiceResource.responseText);
            var jsonItem = obj._embedded._state[0];
            this.parse(jsonItem.value);
        } else {
            alert("Error " + rwServiceResource.status + ": " + rwServiceResource.statusText);
        }
    }

    refreshDataFromWebServiceSync(numLayerNo) {
        var strLayerParameter = "";
        if (numLayerNo < 10) {
            strLayerParameter = WebService.GetRapidSymbolDataSync(this.task, this.module, "rLayerParameter0" + numLayerNo)
        } else {
            strLayerParameter = WebService.GetRapidSymbolDataSync(this.task, this.module, "rLayerParameter" + numLayerNo)
        }
        console.log(strLayerParameter);
        this.parse(strLayerParameter);
    }

    static getLayerParameters() {
        var layerParameters = new Array(0);
        for (var i = 0; i < 40; i++) {
            var layerParameter = new LayerParameter();
            layerParameter.refreshDataFromWebServiceSync(i+1);
            // console.log(layerParameter.toString());
            layerParameters[layerParameters.length] = layerParameter;
        }
        return layerParameters;
    }

    render() {
        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.layerParameter.numWorkAngleDeclination}</td>
            </tr>
        );
    }
}

export default LayerParameter;