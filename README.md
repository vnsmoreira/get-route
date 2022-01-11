# API Get Distance 
A simple and free API to get distance between two addresses


## Setup

Download or clone this repository.
Install dependencies and run locally using:

    npm i
    npm start

## How to use

### Getting distance 
The requisition only requires **origin** and **destination** parameters
		
    http://localhost:3000/ORIGIN/DESTINATION

**Origin** example: "Street Abc, 1234. New York" or "04414000".

**Destination** example: “Street Def, 5678. Canada” or “04335000”.

### Example


    http://localhost:3000/04414000/04335000
#### Response 

````javascript
{
   "status": "OK",
   "distance": 1.7,
   "origin": "R. Rolando Curti - Vila Clara, São Paulo - SP, 04414-000",
   "destination": "R. Leno - Americanópolis, São Paulo - SP, 04335-000"
}
````

    
    
##  Response fields

**Status**: returns "OK" if succeed or "ERROR" if fail.

**Distance**: returns the distance **in kilometers** between *origin* and *destination*.

**Origin**: returns found origin.

**Destination**: returns found destination.


## Using AXIOS
````javascript
let origin = "Avenida Cupece, Americanopolis";
let destination = "Avenida Santo Amaro, Santo Amaro";
    
axios.get(`http://localhost/${origin}/${destination}`).then(response  => {
    console.log(response);
    //do whatever you want
});
````

## How it works?

**Step 1**: The app initializes a browser in background and await for a requisition.

**Step 2**: When a requisition happens, the browser access  Google Maps passing *origin* and *destination* parameters.

**Step 3**: It captures the result data and returns to your API call.

