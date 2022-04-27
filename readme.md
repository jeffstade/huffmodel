# huffmodel

> Develop and visualize Huff models in the browser

See an example application using this module: https://github.com/jeffstern/huff-example-viz

## Install

```sh
npm install huffmodel
```

## Usage

```js
let Huff = require('huffmodel');
//=> output here
```

## API

### generateProbabilities(originsFC, destinationsFC, options?)

#### originsFC

Type: `GeoJSON`

Feature Collection representing the origins in a Huff Model.

#### destinationsFC

Type: `GeoJSON`

Feature collection representing the destinations in a Huff Model. Features should include at least one numerical property to use as an attractiveness property (set via options).

#### options

Type: `object`

> ##### distanceThreshold
> 
> Type: `integer`\
> Default: `10`
> 
> Max distance for destination from origin, in miles
>
> ##### distanceExponent
> 
> Type: `integer`\
> Default: `1`
> 
> Distance exponents usually range between 1-2. The higher the exponent, the more dissuasive distance is on a origin/destination probability.

> ##### destinationAttractivenessProperties
> 
> Type: `Array`\
> Default: `['ACREAGE']`
> 
> Array of any destination feature properties that should be used for assessing attractiveness.
