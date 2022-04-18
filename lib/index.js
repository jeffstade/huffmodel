let turf = require('@turf/turf');

function generateProbabilities(originsFC, destinationsFC, { distanceThreshold = 10, optionTwo = 'hello', originKeyProperty = null } = {}) {
  console.log(`Huff Model for originsGeom and destinationGeom; 
  distance Threshold is ${distanceThreshold} and option2 is ${optionTwo}`);

  let huffProb = {};

  turf.featureEach(originsFC, function(origin, i) {
    if(!originKeyProperty) {
      originKey = i;
    } else {
      originKey = origin.properties[originKeyProperty];
    }
    huffProb[originKey] = {'feature': origin, 'probabilities': [] }
    turf.featureEach(destinationsFC, function(destination, j){
      let distance;
      let probability;

      // calculate distance using turf

      // if distance below threshold, assume prob of 0

      // then calculate probability using distance and attractiveness scores

      // then add to list
      huffProb[originKey]['probabilities'].push({ 'feature': destination, 'probability': probability });
    } );
  }); 
  console.log(huffProb);
  return huffProb;
}

function Huff() {
  return 'huff model';
}

module.exports = Huff;
Huff.generateProbabilities = generateProbabilities;
