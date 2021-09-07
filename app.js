/* Global Variables */
const icons = document.querySelectorAll('.entry__icon');
//OpenWeatherMap API
const baseURL ='http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=b3f990863ce6de3a623f88f83d453848';
const MUnits = '&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click',performAction);

// EventListener Function "Generate Button"
function performAction(){
 const newZip = document.getElementById('zip').value;
 const feelings = document.getElementById('feelings').value;

 if(!newZip)
 {
   alert("Please , Insert a Zip Code");
 }
 else 
 {
 getWeather(baseURL,newZip,apiKey,MUnits)

    .then(function(userData){
      console.log(userData);
      postData('/add' ,{ date : newDate , temp:userData.main.temp , content : feelings })
      updateUI();
    })
  }
};

//Function of Get Route of Data
const getWeather = async(baseURL , newZip , apiKey , MUnits) => {
    const res = await fetch(baseURL+newZip+apiKey+MUnits)
    try {
        const userData  = await res.json();
        return userData ;
    } catch (error) {
        console.log("error",error);
    }
}

// Post Data Function
const postData = async (url = '' , data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)

  });
  try {
      const nData = await response.json();
      console.log(nData);
      return nData;
  } catch (error) {
    console.log("error",error);
  }

}

// Function to Update UI and get all the data
const updateUI = async () => {

    const request = await fetch('/all');
    try {
        const allData = await request.json();
        icons.forEach(icon => icon.style.opacity = '1');
        document.getElementById('date').innerHTML = `Date : ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature : ${allData.temp}`;
        document.getElementById('content').innerHTML = `Feeling : ${allData.content}`;

    } catch (error) {
        console.log("error",error);
    }
}