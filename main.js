// console.log(API_KEY)

const form = document.getElementById('weatherForm');

form.addEventListener('submit', handleFormSubmit);

// Creates mouse effect
document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--x', e.clientX + 'px');
    document.documentElement.style.setProperty('--y', e.clientY + 'px');
});

// Variable declarations
var city
var region
var country
var temperature
var feelsLike
var conditionText
var conditionPNGURL

async function URLCreationAndData(event){
    // Creating URL
    var cityInput
    event.preventDefault(); // Prevents page from reloading
    cityInput = event.target.city.value; // Pulls input city from event.target 

    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityInput}` // Creates URL from api key and city with base URL
    
    const response = await fetch(url); // Goes to URL and retreives data from it

    const data = await response.json(); // Takes data and formatts it
    console.log(data);

    city = data.location.name; // Parses through JSON file and pulls text 
    region = data.location.region;
    country = data.location.country;
    temperature = data.current.temp_f; 
    feelsLike = data.current.feelslike_f;
    conditionText = data.current.condition.text;
    conditionPNGURL = data.current.condition.icon;
}

async function handleFormSubmit(event){

    // Makes URL and retrieves data
    await URLCreationAndData(event) 

    // Checks for previous card and removes it, if it exists
    let weatherDisplay = document.getElementById('weatherDisplay');
    if (weatherDisplay.childElementCount > 0) {
        weatherDisplay.removeChild(weatherDisplay.firstChild);
    }

    // Create card
    let card = document.createElement('div'); // Create card
    card.className = 'card text-center border-warning text-warning bg-transparent mx-auto';
    card.style = 'max-width:18rem'

    let cardBody = document.createElement('div'); // Create body of card
    cardBody.className = 'card-body';

    let cardTitle = document.createElement('h5'); // Create title of card
    cardTitle.innerHTML = `${city}<br>${region}<br>${country}`;
    cardTitle.className = 'card-title';

    let cardText = document.createElement('p'); // Create text of card
    cardText.innerHTML = `<br>Temperature: ${temperature.toFixed(0)}° - 
    Feels like: ${feelsLike.toFixed(0)}° F<br><br>
    ${conditionText}<br>
    <img src="${conditionPNGURL}" alt="${conditionText}"/>`;
    cardText.className = 'card-text';

    cardBody.append(cardTitle); // Add title and text to cardBody
    cardBody.append(cardText);

    card.append(cardBody); // Add body to card

    weatherDisplay.prepend(card); // Add card to weatherDisplay

    document.getElementById('inputForm').value = ''; // Clear input form
}