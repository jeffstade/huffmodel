function generateProbabilities(originsGeom, destinationsGeom, { distanceThreshold = 10, optionTwo = 'hello' } = {}) {
  console.log(originsGeom);
  console.log(`Huff Model for originsGeom and destinationGeom; 
  distance Threshold is ${distanceThreshold} and option2 is ${optionTwo}`);
}

function Huff() {
  return 'huff model';
}

module.exports = Huff;
Huff.generateProbabilities = generateProbabilities;
