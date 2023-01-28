<h1 align="center"><img src="https://user-images.githubusercontent.com/76014502/213812867-d5169761-aaa0-4105-8fe9-a171ba5bf4c3.png"/></h1>

<div align="center">An easy-to-use and free API to retrieve route between multiple CEPs.</div>

## How to use

> GET

    https://api-get-route.herokuapp.com/

````javascript
const mode = 'driving'; // either 'driving' or 'walking'
const origin = '04335-000';
const destination = '01311000';

const params = { origin, destination, mode };
const response = await axios.get('https://api-get-route.herokuapp.com', { params });

const data = response.data;
//do whatever you want

````
### Response 
````json

{
  "ok": true,
  "distance": "14.4 km",
  "distanceRaw": 14402,
  "time": "31 min",
  "timeRaw": 1874,
  "info": [
    {
      "cep": "04335-000",
      "logradouro": "Rua Leno",
      "complemento": "",
      "bairro": "Americanópolis",
      "localidade": "São Paulo",
      "uf": "SP",
      "ibge": "3550308",
      "gia": "1004",
      "ddd": "11",
      "siafi": "7107"
    },
    {
      "cep": "01311-000",
      "logradouro": "Avenida Paulista",
      "complemento": "até 609 - lado ímpar",
      "bairro": "Bela Vista",
      "localidade": "São Paulo",
      "uf": "SP",
      "ibge": "3550308",
      "gia": "1004",
      "ddd": "11",
      "siafi": "7107"
    }
  ]
}


````
<hr/>

> POST

    https://api-get-route.herokuapp.com/

````javascript
const ceps = ['04335000', '01311-000', '05606010', '23812310'];
const mode = 'driving'; // either 'driving' or 'walking'

const response = await axios.post('https://api-get-route.herokuapp.com', { addresses, mode });

const data = response.data;
//do whatever you want

````
### Response 
````json
{
  "ok": true,
  "distance": "2,705 km",
  "distanceRaw": 2704942,
  "time": "39 hr",
  "timeRaw": 141202,
  "info": [
    {
      "cep": "04335-000",
      "logradouro": "Rua Leno",
      "complemento": "",
      "bairro": "Americanópolis",
      "localidade": "São Paulo",
      "uf": "SP",
      "ibge": "3550308",
      "gia": "1004",
      "ddd": "11",
      "siafi": "7107"
    },
    {
      "cep": "01311-000",
      "logradouro": "Avenida Paulista",
      "complemento": "até 609 - lado ímpar",
      "bairro": "Bela Vista",
      "localidade": "São Paulo",
      "uf": "SP",
      "ibge": "3550308",
      "gia": "1004",
      "ddd": "11",
      "siafi": "7107"
    },
    {
      "cep": "05606-010",
      "logradouro": "Avenida Morumbi",
      "complemento": "até 1000 - lado par",
      "bairro": "Morumbi",
      "localidade": "São Paulo",
      "uf": "SP",
      "ibge": "3550308",
      "gia": "1004",
      "ddd": "11",
      "siafi": "7107"
    },
    {
      "cep": "23812-310",
      "logradouro": "Rua São João",
      "complemento": "",
      "bairro": "São José",
      "localidade": "Itaguaí",
      "uf": "RJ",
      "ibge": "3302007",
      "gia": "",
      "ddd": "21",
      "siafi": "5839"
    }
  ]
}

````


## Specifications

### Response

| property    | type    | explanation                                            |
|-------------|---------|--------------------------------------------------------|
| ok          | boolean | returns true if successful, otherwise returns false    |
| distance    | string  | formatted distance (in kilometers). e.g.: "5,5 km"     |
| distanceRaw | number  | distance in meters. e.g.: 5497                         |
| time        | string  | formatted time (in minutes/hours/days). e.g.: "17 min" |
| timeRaw     | number  | time in seconds. e.g.: 1049                            |
| info        | array   | array of objects containing each CEP information       |


## Setup

### Running Localy

Clone this repository and then run:

    npm i
    npm start


## Packages
<ul>
    <li>Express.js</li>
    <li>Redis</li>
    <li>Axios</li>
    <li>GetRoute</li>
    <li>NodeCache</li>
</ul>
