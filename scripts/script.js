// apikey = cd31ec518c172c1a2086aadbf90a38f9



var baseUrl = "https://api.darksky.net/forecast/cd31ec518c172c1a2086aadbf90a38f9/",
	currentbutt = document.querySelector("#current"),
	hourlybutt = document.querySelector("#hourly"),
	dailybutt = document.querySelector("#daily"),
	currentTempNode = document.querySelector(".currentTemp"),
	lu = ""





var locationUrl = function(positionObject) {
	
	currentLat = positionObject.coords.latitude
	currentLong = positionObject.coords.longitude
	currentUrl = baseUrl + currentLat + "," + currentLong + "?callback=?"

	lu = currentUrl	


}

var displayWeatherData = function(weatherJunk) {
	console.log(weatherJunk)
	console.log(location.hash)


	if(location.hash === "#current") {
	temp = weatherJunk.currently.temperature
	currentTempNode.innerHTML = "It is currently " + temp

	}

	else if(location.hash === "#hourly"){
		hourWeather = weatherJunk.hourly.data
		var outputlist = ""
		for(var i = 0; i < 6; i ++){
			console.log(hourWeather[i].temperature)
			if (i === 0 ){
				outputlist +=   "<li class = 'hourly'> right now it's " + hourWeather[i].temperature + "</li>"
			}
			else if (i === 1) {
				outputlist +=   "<li class = 'hourly'>" + i + "hour from now it will be " + hourWeather[i].temperature + "</li>"
			} 
			else {
			outputlist +=   "<li class = 'hourly'>" + i + "hours from now it will be " + hourWeather[i].temperature + "</li>"
			}
		}
		currentTempNode.innerHTML = outputlist
		console.log(temp)
	}

	else if(location.hash === "#daily") {
		dailyWeather = weatherJunk.daily.data
		var outputlist = ""
		for(var i = 0; i < 7; i++) {
			outputlist += "<li class = 'daily'>" + i + "days from now it will be a high of " + dailyWeather[i].temperatureMax + " and a low of " + dailyWeather[i].temperatureMin + "</li>"
		}
		currentTempNode.innerHTML = outputlist
	}
	

}


var weatherSearch = function(currentUrl) {
	var promise = $.getJSON(currentUrl)
	promise.then(displayWeatherData)
}

var displayCurrent = function(){
	
	location.hash = "current"
	weatherSearch(lu)
	
}
var displayHourly = function(){
	
	location.hash = "hourly"
	weatherSearch(lu)
}
var displayDaily = function(){
	
	location.hash = "daily"
	weatherSearch(lu)
}

currentbutt.addEventListener("click", displayCurrent)
hourlybutt.addEventListener("click", displayHourly)
dailybutt.addEventListener("click", displayDaily)

navigator.geolocation.getCurrentPosition(locationUrl)

setTimeout(displayCurrent,1000)