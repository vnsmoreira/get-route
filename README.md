# API Get Distance 
An easy-to-use and free API to calculate distance between multiple addresses

![api-get-distance](https://user-images.githubusercontent.com/76014502/149596241-058ec256-ed60-4e3d-8f8e-c23d571c013b.png)


## Setup

### Running Localy

Clone this repository and then run:

    npm i
    npm start

### Deploying to Heroku (recommended)
<a href="https://www.youtube.com/watch?v=Kl7mqpAK-bk&t=130s"> Deploy puppeteer API to Heroku</a>
> Just replace "localhost:3000" for your heroku API link on the examples below

<br></br>


## How to use

> GET

    http://localhost:3000/ORIGIN/DESTINATION/REGION

````javascript
let origin = "Avenida Cupece, Americanopolis";
let destination = "Avenida Santo Amaro, Santo Amaro";
let region= "Sao Paulo";
    
axios.get(`http://localhost/${origin}/${destination}/${region}`).then(response  => {
    console.log(response);
    //do whatever you want
});
````
### Response 
````javascript
{
   "OK": true,
   "distance": 8.2
}
````
<hr>
<br></br>

> POST

    http://localhost:3000/

````javascript
let addresses = ['Rua Alvares Fagundes', 'Rolando Curti', 'Rua Liberalina'];
let region = 'Sao Paulo';
    
axios.post(`http://localhost`, { addresses, region }).then(response => {
  console.log(response);
  //do whatever you want
});
````
### Response 
````javascript
{
   "OK": true,
   "distance": 2.7
}
````
<br></br>
##  Response fields

**OK**: returns true if succeed or false if fail.

**Distance?**: returns the distance **always in kilometers** between *origin* and *destination*.
<br></br>
## How it works?

**Step 1**: The server initializes puppeteer and await for a requisition.

**Step 2**: When a requisition happens, puppeteer access google maps endpoint passing *origin* and *destination* parameters.

**Step 3**: It scrapes the distance and returns to your API call.

