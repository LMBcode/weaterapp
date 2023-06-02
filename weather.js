
let button = document.getElementById("button");
let latText = document.getElementById("latitude");
let longText = document.getElementById("longitude");
let cityInput = document.getElementById("city")
let humidityText = document.getElementById("humidity");

let body = document.getElementById("body")

let city = document.getElementById("weatherCountry");
let temperatue_txt = document.getElementById("temperature");
let icon = document.getElementById("tempIcon");



const fetchData = async () => {

    let baseUrl = "https://api.openweathermap.org/data/2.5/"
    let geoBaseUrl="http://api.openweathermap.org/geo/1.0/"

    let apiKey = "0ce8826e63da23dd04f890e4e4d76f2c"
    // weather?lat={lat}&lon={lon}&appid={API key
    try{
            const response = await fetch(baseUrl + `weather?q=${cityInput.value}&appid=${apiKey}`)
            const responseGeo = await fetch(geoBaseUrl + `direct?q=${cityInput.value}&limit=5&appid=${apiKey}`)

            const data = await response.json()
            const geoData = await responseGeo.json()

            if (geoData.length > 0) {
                let lat = geoData[0].lat;
                let lon = geoData[0].lon;
            
                latText.textContent = "Latitude " + lat.toFixed(2);
                longText.textContent = "Longitude " + lon.toFixed(2);
            } else {
                console.error("No location data returned");
            }
        

            const temperature = data.main.temp
            const humidity = data.main.humidity
            const windSpeed = data.wind.speed
            const weatherDescription = data.weather[0].description

            humidityText.textContent = `Humidity ${humidity}`

            city.textContent = cityInput.value;

            let fixedTemp = temperature - 273.15
            temperatue_txt.textContent = Math.round(fixedTemp) + '°C'

            getIconState(weatherDescription)
            console.log(`Temperature: ${temperature}`)
            console.log(`Humidity: ${humidity}`)
            console.log(`Wind Speed: ${windSpeed}`)
            console.log(`Weather Description: ${weatherDescription}`)
        }
        catch (error) {
            console.error("There was an error fetching the weather data: ", error);
        }
}

let images = ['naturebackground.jpeg','lake.jpg','rocky.jpg','mountain-top.jpg'];
let currentIndex = 0;

const changeImage = () => {
    let newIndex = currentIndex;
    while(newIndex === currentIndex){
        newIndex = Math.floor(Math.random() * images.length);
    }
    currentIndex = newIndex;
    body.style.backgroundImage = `url(${images[currentIndex]})`;
};

setInterval(changeImage, 3000);

const getIconState = (weatherDescription) => {

    console.log(`Weather description: ${weatherDescription}`);  // Log the weather description

    if(weatherDescription.includes("clouds")){
        console.log('Setting icon to cloudy.png');  // Log before setting icon.src
        icon.src ="cloudy.png";
        

    } else if (weatherDescription.includes("clear sky")) {
        icon.src ="sun.png";
      } else if (weatherDescription.includes("raom")) {
        icon.src ="rainy-day.png";
      } else {
        icon.src = "";
      }
}


button.addEventListener('click', fetchData);
