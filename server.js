// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express'); 



// Start up an instance of app
const app = express(); 

//Dependencies
const bodyParser = require('body-parser'); 

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors');  
app.use(cors()); 

// Initialize the main project folder
app.use(express.static('website'));





app.get('/all', (req, res) => {
  res.send(projectData);
  projectData = [];
})

app.post('/add', (req,res) => {
    console.log(req.body);
    newEntry = {
           date : req.body.date,
           temp : req.body.temp,
           content : req.body.content
    }
    Object.assign(projectData, newEntry);
// projectData.push(newEntry);
})

const port = 8080;
app.listen(port, () => {console.log(`server is running and listening to port ${port} `);}); 
