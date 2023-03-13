// https://openweathermap.org/current#name 
//Used Open Weather Map API to get weather data
/*
Todo:
- Add error handling if name is entered wrong.
- Add language option.
- Add option to change between imperial and metric.
- Don't get data if the same...etc.
*/
let weather = {
    "apiKey": "731e47053b61cf63aa05b2f6fe908859",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city +"&appid=" 
            + this.apiKey 
            +"&units=imperial"
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        //console.log(name, icon, description, temp, humidity, speed)

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText =  Math.round(temp) + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed.toFixed(1) + " mph";

        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https:/source.unsplash.com/2000x1100/?" + name + ",city" +"')"
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}  

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.search();
    }
})

weather.fetchWeather("Tokyo");