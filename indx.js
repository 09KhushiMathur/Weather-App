
let cityName = document.querySelector(".weather_city")
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let W_temperature = document.querySelector(".weather_temperature");
let W_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let w_humidity = document.querySelector(".weater_Humidity");
let w_pressure = document.querySelector(".weather_Pressure");
let w_wind = document.querySelector(".weather_wind");
let w_feelsLike = document.querySelector(".weather_feelsLike");
let citySearch = document.querySelector(".weather_form");
const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
}
const getDateTime = (dt,timezone) => {
    let timeZone = timezone
    const curDate = new Date((dt+timeZone) * 1000)  //converting into milliseconds//
    console.log(curDate)
    const option = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: "UTC"
    };
    const formatter = new Intl.DateTimeFormat("en-US", option);
    console.log(formatter);
    return formatter.format(curDate);


};
let city = "Meerut";
citySearch.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = document.querySelector(".city_name");
    console.log(cityName.value);
    city = cityName.value;
    getWeatherData();
    cityName.value = "";
})

const getWeatherData = async () => {
const weatherUrl = `/.netlify/functions/weather?city=${encodeURIComponent(city)}`;    
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);
        const { main, name, weather, wind, sys, dt,timezone } = data;
        cityName.textContent = `${name},${getCountryName(sys.country)}`;
        dateTime.innerHTML = `${getDateTime(dt,timezone)}`;
        w_forecast.innerHTML = `${weather[0].main}`;
        w_icon.innerHTML = `${weather[0].icon}`;

        W_temperature.innerHTML = `${main.temp}&#176`;
        W_minTem.innerHTML = `Min:${main.temp_min.toFixed()}&#176 C`;
        w_maxTem.innerHTML = `Max:${main.temp_max.toFixed()}&#176 C`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_pressure.innerHTML = `${main.pressure}hPa`;
        w_wind.innerHTML = `${wind.speed}m/s`;
        w_feelsLike.innerHTML = `${main.feels_like}&#176`;
        const iconCode = data.weather[0].icon; // e.g. "01n"
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.querySelector(".weather_icon").innerHTML = `<img src="${iconUrl}" alt="weather condition">`;

        // Dynamic Gradient based on Weather Condition
        const mainCondition = data.weather[0].main.toLowerCase(); // e.g. "rain", "clear", "clouds"
        if (mainCondition.includes("rain")) {
            document.body.style.background = "linear-gradient(135deg, #203a43, #2c5364)";
        } else if (mainCondition.includes("clear")) {
            document.body.style.background = "linear-gradient(135deg, #0f172a, #1e293b)";
        } else if (mainCondition.includes("clouds")) {
            document.body.style.background = "linear-gradient(135deg, #373b44, #4286f4)";
        }

       
    } catch (error) {
        console.log(error)

    }
}


document.body.addEventListener("load", getWeatherData());

