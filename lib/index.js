let turf = require('@turf/turf');

function compare_probabilities( a, b )
  {
  if ( a.probability > b.probability){
    return -1;
  }
  if ( a.probability < b.probability){
    return 1;
  }
  return 0;
}

function generateProbabilities(originsFC, destinationsFC, { distanceThreshold = 10, destinationKeyProperty = null, destinationAttractivenessProperty = 'ACREAGE', originKeyProperty = null } = {}) {
  let huffProb = [];
  turf.featureEach(originsFC, function(origin, i) {
    if(!originKeyProperty) {
      originKey = i;
    } else {
      originKey = origin.properties[originKeyProperty];
    }
    let probs = [];
    huffProbFeature = {'type': origin.type, 'properties': origin.properties, 'geometry': origin.geometry, 'probabilities': []};
    turf.featureEach(destinationsFC, function(destination, j){
      let distance;
      let probability;
      let attractiveness = parseFloat(destination.properties[destinationAttractivenessProperty]);
      distance = turf.distance(turf.center(destination), turf.center(origin), {'units': 'miles'})
      if (distance > distanceThreshold) {
        probs.push(0);
      } else {
        probs.push(attractiveness / distance);
      }
    } );
    let sumProbs = probs.reduce((partialSum, a) => partialSum + a, 0);
    turf.featureEach(destinationsFC, function(destination, k) {
        probability = probs[k] / sumProbs;
        if (probability > 0) {
          huffProbFeature['probabilities'].push({ 'feature': destination, 'probability': probability });
        }
      });
    huffProbFeature['probabilities'].sort(compare_probabilities);
    huffProb.push(huffProbFeature);
  }); 
  return turf.featureCollection(huffProb);
}

function Huff() {
  return 'huff model';
}

module.exports = Huff;
Huff.generateProbabilities = generateProbabilities;