var NUM = 24;
var DIMS = getDims();

export function getClosestDim(width, height) {
  var ratio = width / height;
  var closest = null;
  var closestDifference = Infinity;
  DIMS.forEach(dim => {
    var difference = Math.abs(dim.ratioX2 - ratio);
    if(difference < closestDifference) {
      closestDifference = difference;
      closest = dim;
    }
  })
  return {
    width:width/closest.width-0.25,
    height:height/closest.height
  };
}

function getDims() {
    var dims = [];
    for(var width = 1; width <= NUM; width++) {
        var height = NUM/width;
        if(height % 1 === 0) {
            dims.push( {
                height,
                width,
                ratio:width/height,
                ratioX2:3*width/height
            })
        }
    }
    return dims;
}