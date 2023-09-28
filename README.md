<h1 align="center"><img src="https://user-images.githubusercontent.com/76014502/213812867-d5169761-aaa0-4105-8fe9-a171ba5bf4c3.png"/></h1>

<div align="center">A simple utility to calculate route between multiple CEPs.</div>

<br/>

> :warning: Not compatible with Browsers due to CORS Policy.

## Installation

    npm i get-route

## How to use

````javascript
import getRoute from 'get-route';
...

const ceps = ['04336000', '04335000'];

const response = await getRoute(ceps);

console.log(response);


````
### Response 
````javascript
{
  ok: true,
  distance: '1,2 km',
  distanceRaw: 1179,
  time: '5 min',
  timeRaw: 283
}
````
<br/>

## Specifications

### Arguments

| argument | required | default   |         accepted values       |
|----------|----------|-----------|-------------------------------|
| ceps     | true     | none      | array of strings (valid ceps) |
| mode     | false    | 'driving' | either 'driving' or 'walking' |


### Response

| property    | type    | explanation                                            |
|-------------|---------|--------------------------------------------------------|
| ok          | boolean | returns true if successful, otherwise returns false    |
| distance    | string  | formatted distance (in kilometers). e.g.: "5,5 km"     |
| distanceRaw | number  | distance in meters. e.g.: 5497                         |
| time        | string  | formatted time (in minutes/hours/days). e.g.: "17 min" |
| timeRaw     | number  | time in seconds. e.g.: 1049                            |
