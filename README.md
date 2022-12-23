<h1 align="center"><img src="https://user-images.githubusercontent.com/76014502/166403918-7c8fea60-b2f0-4786-a9a5-ff5ad5729f94.png"/></h1>

<div align="center">An easy-to-use and free API template to calculate distance between multiple CEPs.</div>

## Setup

### Running Localy

Clone this repository and then run:

    npm i
    npm start


## How to use

> GET

    http://localhost:3000/distance

````javascript
const mode = 'driving'; // either 'driving' or 'walking'
const origin = '04335-000';
const destination = '01311000';

const params = { origin, destination, mode };
const response = await axios.get('http://localhost:3000/distance', { params });

const data = response.data;

//do whatever you want

````
### Response 
````javascript
{
  "distance": 14.4 //always in km,
  "cepsInfo": [
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

    http://localhost:3000/distance 

````javascript
const addresses = ['04335000', '01311-000', '05606010', '23812310'];
const mode = 'driving'; // either 'driving' or 'walking'

const response = await axios.post(`http://localhost:3000/distance/`, { addresses, mode });
const data = response.data;

//do whatever you want

````
### Response 
````javascript
{
  "distance": 2.677 //always in km,
  "cepsInfo": [
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


<br></br>

## Technologies and APIs used in this project

### Stack
<ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>Puppeteer</li>
    <li>Puppeteer-cluster</li>
    <li>Redis</li>
    <li>axios</li>
</ul>

### APIs
<ul>
    <li>viacep API</li>
    <li>google maps (direct query)</li>
</ul>
