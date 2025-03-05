
function getWeather() {
    let city = document.getElementById('city').value;
    let weatherContainer = document.querySelector(".weather-container");

    if (!city) {
        alert("Please enter a city!");
        return;
    }

    weatherContainer.classList.remove("expanded");

    
    fetch(`/weather?city=${city}`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching current weather data:", error);
            alert("Error fetching current weather data. Please try again.");
            weatherContainer.classList.remove("expanded");
        });

    
    fetch(`/forecast?city=${city}`)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error("Error fetching hourly forecast data:", error);
            alert("Error fetching hourly forecast data. Please try again.");
        });
}

// fadea in väder rutan????

function displayWeather(data) {
    let tempDivInfo = document.getElementById("temp-div");
    let weatherInfoDiv = document.getElementById("weather-info");
    let weatherIcon = document.getElementById("weather-icon");
    let hourlyForecastDiv = document.getElementById("hourly-forecast");
    let weatherContainer = document.querySelector(".weather-container");

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        weatherContainer.classList.remove("expanded");
    } else {
        let cityName = data.name;
        let temperature = Math.round(data.main.temp);
        let description = data.weather[0].description;
        let iconCode = data.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        let temperatureHTML = `<p>${temperature}°C</p>`;
        let weatherHTML = `<p>${cityName}</p> <p>${description}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        weatherContainer.classList.add("expanded");
        showImage();
    }
};

function displayHourlyForecast(hourlyData) {
    let hourlyForecastDiv = document.getElementById("hourly-forecast");
    let next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
        let dateTime = new Date(item.dt * 1000);
        let hour = dateTime.getHours();
        let temperature = Math.round(item.main.temp);
        let iconCode = item.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        let hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
};

function showImage() {
    let weatherIcon = document.getElementById("weather-icon");
    weatherIcon.style.display = "block";
}