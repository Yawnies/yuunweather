const APIKey = 'E6A5OJgtaZmN5Dxhjx9uBFgpbNBle5IX';
// const domTest = document.querySelector(".selected-city");

async function getCityWeather(cityKey) {
    const base = "https://dataservice.accuweather.com/currentconditions/v1/";
    const baseExtra = `${cityKey}?apikey=${APIKey}`;

    const response = await fetch(base + baseExtra);
    const jsonData = await response.json();

    return jsonData[0];
}

async function getCity(city) {
    const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
    const baseExtra = `?apikey=${APIKey}&q=${city}`;

    const response = await fetch(base + baseExtra);
    const jsonData = await response.json();

    return jsonData[0];
}

// getCity('newyork')
//     .then(successData => {
//         return getCityWeather(successData.Key);
//     }).then(weatherData => {
//         domTest.innerHTML = weatherData.WeatherText;
//     })
//     .catch(err => {
//         console.log(err);
//     });

// test this function out first in this script to see if it changes the dom properly before going for the search query!!!!!!!!!!!
