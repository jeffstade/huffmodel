let turf = require('@turf/turf');
let distinctColors = require('distinct-colors').default;
let chroma = require('chroma-js');

let palette = distinctColors({ count: 50 }); // You may pass an optional config object

function compareProbabilities(a, b) {
  if (a.probability > b.probability) {
    return -1;
  }
  if (a.probability < b.probability) {
    return 1;
  }
  return 0;
}

function generateProbabilities(originsFC, destinationsFC, {
  distanceThreshold = 10, destinationAttractivenessProperty = 'ACREAGE',
} = {}) {
  let huffProb = [];
  turf.featureEach(originsFC, (origin, i) => {
    let probs = [];
    let huffProbFeature = {
      type: origin.type,
      properties: origin.properties,
      geometry: origin.geometry,
      probabilities: [],
    };
    turf.featureEach(destinationsFC, (destination, j) =>  {
      let distance;
      let attractiveness = parseFloat(destination.properties[destinationAttractivenessProperty]);
      distance = turf.distance(turf.center(destination), turf.center(origin), { units: 'miles' });
      if (distance > distanceThreshold) {
        probs.push(0);
      } else {
        probs.push(attractiveness / distance);
      }
    });
    let sumProbs = probs.reduce((partialSum, a) => partialSum + a, 0);
    turf.featureEach(destinationsFC, (destination, k) => {
      let probability = probs[k] / sumProbs;
      if (probability > 0) {
        huffProbFeature.probabilities.push({ feature: destination, probability });
      }
    });
    huffProbFeature.probabilities.sort(compareProbabilities);
    huffProb.push(huffProbFeature);
  });
  return turf.featureCollection(huffProb);
}

function setDestinationColors(destinationsFC, colors = palette) {
  turf.featureEach(destinationsFC, (destination, i) => {
    // eslint-disable-next-line no-param-reassign
    destination.color = chroma(colors[i % palette.length]).hex();
  });
  return destinationsFC;
}

function getDestinationColors(destination) {
  return destination.color;
}

function Huff() {
  return 'huff model';
}

module.exports = Huff;
Huff.generateProbabilities = generateProbabilities;
Huff.setDestinationColors = setDestinationColors;
Huff.getDestinationColors = getDestinationColors;
