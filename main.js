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

        if ((text = "Sunny")) {
          icon =
            "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/clear-day.svg";
        }

        app.innerHTML = `
                    <div class="top">
                        <div class= "left">
                            <section class="location">
                                <h1>${name}, ${region}</h1>
                                <img src="${icon}" class="icon" />
                            </section>

                            <section class="temperature">
                                <h2 class="temperature-degree">${temp_c}C/${temp_f}F</h2>
                                <div class="temperature-description">${text}</div>
                                <h3 class= "feels-like"> Feels like ${feelslike_c}C/${feelslike_f}F</h3>
                            </section>
                            </div>
                        
                    
                    
                        <div class="right">
                            <section class= "weather">

                                <section class="wind">
                                   <h2><img src= "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/wind.svg" class= "wind-img">Wind: ${wind_kph}km/h ${wind_dir}</h2>
                                </section>

                                <section class="humidity">
                                    <h2><img src= "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/humidity.svg" class= "humidity-img">Humidity: ${humidity} %</h2>
                                </section>

                                <section class="rainfall">
                                    <h2><h2><img src= "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/rain.svg" class= "rainfall-img">Rainfall: ${precip_mm} mm</h2>
                                </section>

                            
                                <section class="uv">
                                    <h2><img src= "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/uv-index.svg" class= "uv-img">UV index: ${uv}</h2>
                                </section>


                                <section class="pressure">
                                    <h2><img src= "https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/pressure-high.svg" class= "pressure-img">Pressure: ${pressure_mb} mb</h2>
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
