// init local storage
const storage = new Storage();
// get stored location data
const weatherLocation = storage.getLocationData();

// initialize weather object dynamically
const weather = new Weather(weatherLocation.city, weatherLocation.state);

// init UI object
const ui = new UI;

// event listener for DOM loaded
document.addEventListener('DOMContentLoaded', getWeather);

// change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    
    // call change location method
    weather.changeLocation(city, state);

    // set location in LocSto
    storage.setLocationData(city, state);

    // get weather again, re-paint DOM
    getWeather();

    // close modal (use jQuery because Bootstrap requires so)
    $('#locModal').modal('hide');
});

// wrap up getWeather method in its' own function to run when DOM is loaded
function getWeather(){
    weather.getWeather()
    // paint results from UI
    .then(results => ui.paint(results))
    .catch(err => console.log(err));
}
