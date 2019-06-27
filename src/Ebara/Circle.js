class Circle {
  constructor() {
    this.numDegree0 = 0;
    this.numDegree90 = 0;
    this.numDegree180 = 0;
    this.numDegree270 = 0;
    this.numCurveType = 1;
  }

  toString() {
    var strCircle = "[" + this.numDegree0 + "," + this.numDegree90 + "," + this.numDegree180 + "," + this.numDegree270 + "," + this.numCurveType + "]";
    // console.log(strCircle);
    return strCircle;
  }

  parse(strCircle){
    var numStartIndex=0;		
    var numStopIndex=0;	
    // console.log(strCircle);
    
    numStartIndex=strCircle.indexOf("[")+1;	
    numStopIndex=strCircle.indexOf(",",numStartIndex);		
    this.numDegree0=strCircle.substring(numStartIndex,numStopIndex);
    
    numStartIndex=numStopIndex+1;	
    numStopIndex=strCircle.indexOf(",",numStartIndex);		
    this.numDegree90=strCircle.substring(numStartIndex,numStopIndex);
        
    numStartIndex=numStopIndex+1;	
    numStopIndex=strCircle.indexOf(",",numStartIndex);		
    this.numDegree180=strCircle.substring(numStartIndex,numStopIndex);
        
    numStartIndex=numStopIndex+1;	
    numStopIndex=strCircle.indexOf(",",numStartIndex);		
    this.numDegree270=strCircle.substring(numStartIndex,numStopIndex);
        
    numStartIndex=numStopIndex+1;	
    numStopIndex=strCircle.indexOf("]",numStartIndex);		
    this.numCurveType=strCircle.substring(numStartIndex,numStopIndex);

  }
}

export default Circle;