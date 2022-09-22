const changeLocationForm = document.querySelector(".change-location");
const cityFormInput = document.querySelector(".city-input");

//dom changes
const selectedCityD = document.querySelector(".selected-city");
const currentWeatherD = document.querySelector(".weather-type");
const tempValue = document.querySelector(".temp");
const cardElement = document.querySelector(".card");
const timeCardImage = document.querySelector(".card-image");
const errorLog = document.querySelector(".error-red");

changeLocationForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    if(!errorLog.classList.contains('display-n')) {
        errorLog.classList.add('display-n');
    }

    const cityName = cityFormInput.value.trim();
    updateCityDetails(cityName)
        .then(cityDetails => { // cityDetails is the RETURNED data from the fucking promise
            selectedCityD.innerHTML = cityDetails.cityData.EnglishName;
            currentWeatherD.innerHTML = cityDetails.cityWeather.WeatherText;
            tempValue.innerHTML = cityDetails.cityWeather.Temperature.Metric.Value;

            let timeStatus = null; // code block sets variable to right image according to area time
            if(cityDetails.cityWeather.IsDayTime) {
                timeStatus = 'svg/day.png';
            } else {
                timeStatus = 'svg/night.png';
            }

            timeCardImage.setAttribute('src', timeStatus); // replaces the image source with timestatus var

            if(cardElement.classList.contains("display-n")) {
                cardElement.classList.remove("display-n");
            }
        })
        .catch(error => {
            console.log("Error detected!!!!!!!!: " + error);
            errorLog.classList.remove('display-n');
        });

    changeLocationForm.reset();
});

async function updateCityDetails(cityName) {
    const cityData = await getCity(cityName);
    const cityWeather = await getCityWeather(cityData.Key);

    return {
        cityData: cityData,
        cityWeather: cityWeather
    };

}