# API Get Distance 
A simple and free API to get distance between two addresses


## Setup

### Running Localy

Clone this repository and then run:

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
### Response 

````javascript
{
   "OK": true,
   "distance": 1.7
}
````

    
<br></br>
##  Response fields

**OK**: returns true if succeed or false if fail.

**Distance**: returns the distance **always in kilometers** between *origin* and *destination*.


<br></br>
## Example
### Using AXIOS
````javascript
let origin = "Avenida Cupece, Americanopolis";
let destination = "Avenida Santo Amaro, Santo Amaro";
    
axios.get(`http://localhost/${origin}/${destination}`).then(response  => {
    console.log(response);
    //do whatever you want
});
````


<br></br>
## How it works?

**Step 1**: The app initializes a browser in background and await for a requisition.

**Step 2**: When a requisition happens, the browser access  Google Maps passing *origin* and *destination* parameters.

**Step 3**: It captures the result data and returns to your API call.

