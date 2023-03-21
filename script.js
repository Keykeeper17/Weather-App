//Used Open Weather Map API to get weather data
// https://openweathermap.org/current#name 
/*
Todo:
- Add error handling if name is entered wrong. --Done, maybe a better way to catch errors?
- Add language option.
- Add option to change between imperial and metric.
- Don't get data if the same...etc. -- Solved, uses old data from previous api call.
*/
let oldResponse;
let oldCity;

let weather = {
    "apiKey": "731e47053b61cf63aa05b2f6fe908859",
    fetchWeather: function(city, units){
        //fetch funciton always returns OK unless something odd like a networking issue...etc.
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city +"&appid=" 
            + this.apiKey 
            + "&units="
            + units
        ).then((response) => {
            //Checks if API response was not a success (status range 200-299)
            //console.log("&units=" + units);
            if (!response.ok){
                console.log("Not Successful");
                console.log(response);
                console.log(response.status, ': ', response.statusText);
                document.querySelector(".cityfound").classList.add("notfound");
                throw new Error("Unsucessful API Call: "+response.status+': '+response.statusText);
            }
            //If previous API call matches current city then return old data to save making new API call.
            else if (oldResponse == city){
                console.log("Duplicate response");
                console.log(oldResponse);
                return oldResponse;
            }
            oldResponse = response;
            oldCity = city;
            console.log("SUCCESS response");
            document.querySelector(".cityfound").classList.remove("notfound");
            return response.json();
        })
        .then(data => this.displayWeather(data, units))
        .catch(error => console.error(error));
    },
    displayWeather: function(data, units){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(units);

        console.log(name, icon, description, temp, humidity, speed)

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        if (units == "imperial"){
            document.querySelector(".temp").innerText =  Math.round(temp) + "°F";
        }
        else{
            document.querySelector(".temp").innerText =  Math.round(temp) + "°C";
        }
        
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";

        if (units == "imperial"){
            document.querySelector(".wind").innerText = "Wind speed: " + speed.toFixed(1) + " mph";
        }
        else{
            document.querySelector(".wind").innerText = "Wind speed: " + speed.toFixed(1) + " kph";
        }

        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https:/source.unsplash.com/2000x1100/?" + name + ",city" +"')"
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value, document.querySelector(".units").value);
    }
}  

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Tokyo", "imperial");