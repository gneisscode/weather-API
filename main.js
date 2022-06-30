window.addEventListener("load", () => {
  let long;
  let lat;
  let app = document.querySelector("#app");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.weatherapi.com/v1/current.json?key=b95a0269dd2e41c4ba9155455220906&q=${lat},${long}&aqi=yes`;

      async function getData(url) {
        const data = await fetch(url);
        return await data.json();
      }

      getData(api).then((data) => {
        console.log(data);

        let { name, region, country } = data.location;
        let { text, icon } = data.current.condition;
        let {
          is_day,
          temp_c,
          temp_f,
          last_updated,
          wind_kph,
          wind_dir,
          uv,
          vis_km,
          pressure_mb,
          humidity,
          precip_mm,
          feelslike_c,
          feelslike_f,
        } = data.current;

        // if ((text = "Sunny")) {
        //   icon =
        //     "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/clear-day.svg";
        // }
    
        const icons = {
          "Sunny":"https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/clear-day.svg",
          "Partly cloudy":"https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/partly-cloudy-day.svg",
          "Cloudy": "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/cloudy.svg",
          "Overcast":"https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/overcast.svg",
          "Light drizzle": "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/drizzle.svg",
          "Heavy rain": "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/rain.svg",
          "Moderate or heavy rain with thunder": "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/thunderstorms-extreme-rain.svg",
        };

        if (icons.hasOwnProperty(text)){
            icon= icons[text]
        }

        else{
            icon=data.current.condition.icon
        }

        app.innerHTML = `
                    <div class="top">
                        <div class= "left">
                            <section class="location">
                                <h1>${name}, ${region}</h1>
                                <img src=${icon} class="icon" />
                            </section>

                            <section class="temperature">
                                <h2 class="temperature-degree">${temp_c}&deg;C/${temp_f}&deg;F</h2>
                                <div class="temperature-description">${text}</div>
                                <h3 class= "feels-like"> Feels like ${feelslike_c}&deg;C/${feelslike_f}&deg;F</h3>
                            </section>
                            </div>
                        
                    
                    
                        <div class="right">
                            <section class= "weather">

                                <section class="wind">
                                   <h2><img src= "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/wind.svg" class= "wind-img">Wind: <span class="labels">${wind_kph}km/h ${wind_dir}</span></h2>
                                </section>

                                <section class="humidity">
                                    <h2><img src= "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/humidity.svg" class= "humidity-img">Humidity: <span class="labels">${humidity} %</span></h2>
                                </section>

                                <section class="rainfall">
                                    <h2><h2><img src= "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/rain.svg" class= "rainfall-img">Rainfall: <span class="labels">${precip_mm} mm</span></h2>
                                </section>

                            
                                <section class="uv">
                                    <h2><img src= "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/uv-index.svg" class= "uv-img">UV index: <span class="labels">${uv}</span></h2>
                                </section>


                                <section class="pressure">
                                    <h2><img src= "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/pressure-high.svg" class= "pressure-img">Pressure: <span class="labels">${pressure_mb} mb</span></h2>
                                </section>

                            
                            </section>
                        </div>
                    </div>
                    <div class="bottom">
                        <p class="updated-text"> last updated ${last_updated} </p>
                    </div>

                `;
      });
    });
  }
});
