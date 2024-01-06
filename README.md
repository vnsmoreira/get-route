<h1 align="center"><img src="https://user-images.githubusercontent.com/76014502/213812867-d5169761-aaa0-4105-8fe9-a171ba5bf4c3.png"/></h1>

<div align="center">A simple utility to calculate route between addresses.</div>

<br/>

> :warning: Not compatible with Browsers due to CORS Policy.

## Installation

    npm i get-route

## How to use

````javascript
import getRoute from 'get-route';
...

const origin = 'Cupecê, 3958';
const destination = '04335-000';

const response = await getRoute(origin, destination);

console.log(response);


````
### Response 
````javascript
{
  ok: true,
  distance: '2,0 km',
  distanceRaw: 1993,
  time: '8 min',
  timeRaw: 454,
  origin: 'Av. Cupecê, 3958 - Jardim Prudência',
  destination: '04335-000'
}
````
<br/>

## Specifications

### Arguments

| argument | required | default   |         accepted values       |
|----------|----------|-----------|-------------------------------|
| addresses| true     | none      | array of addresses            |


### Response

| property    | type    | explanation                                            |
|-------------|---------|--------------------------------------------------------|
| ok          | boolean | success status                                         |
| distance    | string  | formatted distance (in kilometers). e.g.: "5,5 km"     |
| distanceRaw | number  | distance in meters. e.g.: 5497                         |
| time        | string  | formatted time (in minutes/hours/days). e.g.: "17 min" |
| timeRaw     | number  | time in seconds. e.g.: 1049                            |
| origin      | string  | found origin                                           |
| destination | string  | found destination                                      |
