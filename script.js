
let weatherMain = document.getElementById("weather-main")
let extraInfos = document.getElementById("section2")

let windSpeed = document.getElementById("windspeed")
let sunRise = document.getElementById("sunrise")
let sunSet = document.getElementById("sunset")
let humidity = document.getElementById("humidity")
let pressure = document.getElementById("pressure")
let visible = document.getElementById("visibility")

let cityName = document.getElementById("city-name")
let deg = document.getElementById("deg")
let mainDescription = document.getElementById("main-description")
let description = document.getElementById("description")
let mainImg = document.getElementById("main-image")
let mainImgContainer = document.getElementById("weather-img")

let input = document.getElementById("input")
let searchBtn = document.getElementById("search-btn")

let cityErrMsg = document.getElementById("city-not-found")
let crossMark = document.getElementById("cross-mark")

let emptyContainer= document.getElementById("empty-cont")
let emptyContCrossMark = document.getElementById("empty-msg-cross-mark")

function getSunrise(sunriseMilliseconds){
    const sunRiseSeconds = sunriseMilliseconds * 1000
    const sunriseDate  = new Date(sunRiseSeconds)
    const sunriseTiming = sunriseDate.toLocaleTimeString()
    return sunriseTiming
}

function getSunset(sunsetMilliseconds){
    const sunSetSeconds = sunsetMilliseconds * 1000
    const sunSeteDate  = new Date(sunSetSeconds)
    const sunsetTiming = sunSeteDate.toLocaleTimeString()
    return sunsetTiming
}

const icons = [
    "01d",
    "01n",
    "02d",
    "02n",
    "03d",
    "03n",
    "04d",
    "04n",
    "09d",
    "09n",
    "10d",
    "10n",
    "11d",
    "11n",
    "13d",
    "13n",
    "50d",
    "50n"
]

async function weaht(){
    let userInput = input.value.trim()

    if(userInput == ""){
        emptyContainer.style.display="flex"
        weatherMain.style.display="none"
        extraInfos.style.display="none"
        console.log("enter something")
        return false;
    }

    let firstChar = userInput.charAt(0).toUpperCase()
    let remaningChar = userInput.slice(1, userInput.length)
    let altCityName = firstChar + remaningChar

    try{     
        let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${altCityName}&appid=8ae1232aabeb8bc35e40bb9b0ab1b80f&units=metric`)
        let res = await api.json()
        console.log(res)
        
        if(res.cod==404 || res.cod== 400){
            weatherMain.style.display="none"
            extraInfos.style.display="none"
            cityErrMsg.style.display="flex"
            console.error("city not found")
        }
        else{
            weatherMain.style.display="inline-block"
            extraInfos.style.display="inline-block"
            cityErrMsg.style.display="none"
            const {coord, main, sys, weather, visibility, wind} = res

            var weatherImage = document.createElement("img")
            weatherImage.id="main-image"

            let icon =  icons.find(ele => {
                 return weather[0].icon == ele
             })


             while (mainImgContainer.firstChild) {
                mainImgContainer.removeChild(mainImgContainer.firstChild);
            }

           
           
            if(icon){
                weatherImage.src=""
                weatherImage.src = `./static/${icon}.svg`
                console.log("hello")
                weatherImage.alt=""
                mainImgContainer.append(weatherImage)
            }
            else{
                console.log('second')
                // weatherImage.src=""
                weatherImage.alt="Sorry image not available"
                mainImgContainer.append(weatherImage)
            }

            cityName.innerText=res.name
            deg.innerText= main.temp + "°C"
            mainDescription.innerText = weather[0].main
            description.innerText = weather[0].description
            windSpeed.innerText= (wind.speed) + " m/s"
            humidity.innerText= main.humidity + " %" 
            pressure.innerText= main.pressure + " hpa"
            visible.innerText= (visibility/1000) + " KM"
            sunRise.innerText= `${getSunrise(sys.sunrise)}`
            sunSet.innerText= `${getSunset(sys.sunset)}` 
        }
    } 
    catch(err){
        console.log(err)
    }
}

const defaultCity = async ()=>{
    let defaultAPi = await fetch("https://api.openweathermap.org/data/2.5/weather?q=madurai&appid=8ae1232aabeb8bc35e40bb9b0ab1b80f&units=metric")
    let res = await defaultAPi.json()

    cityErrMsg.style.display="none"
    weatherMain.style.display="inline-block"
    extraInfos.style.display="inline-block"
    const {coord, main, sys, weather, visibility, wind} = res

    let weatherImage = document.createElement("img")
    weatherImage.id="main-image"
    
    let icon =  icons.find(icon => {
         return weather[0].icon == icon
     })


    while (mainImgContainer.firstChild) {
        mainImgContainer.removeChild(mainImgContainer.firstChild);
    }

    if(icon){
        weatherImage.src=""
        weatherImage.alt=""
        weatherImage.src = `./static/${icon}.svg`
        mainImgContainer.append(weatherImage)
    }
    else{
        weatherImage.src= ""
        weatherImage.alt="Sorry image not available"
    }

    cityName.innerText=res.name
    deg.innerText= main.temp + "°C"
    mainDescription.innerText = weather[0].main
    description.innerText = weather[0].description
    windSpeed.innerText= (wind.speed) + " m/s"
    humidity.innerText= main.humidity + " %" 
    pressure.innerText= main.pressure + " hpa"
    visible.innerText= (visibility/1000) + " KM"
    sunRise.innerText=`${getSunrise(sys.sunrise)}`
    sunSet.innerText=`${getSunset(sys.sunset)}` 
}

const closeMessage = ()=>{
    cityErrMsg.style.display="none"
    weatherMain.style.display="inline-block"
    extraInfos.style.display="inline-block"
}

const closeEmptyMessage = ()=>{
    emptyContainer.style.display="none"
    weatherMain.style.display="inline-block"
    extraInfos.style.display="inline-block"
}

searchBtn.addEventListener("click", weaht)
crossMark.addEventListener("click", closeMessage)
emptyContCrossMark.addEventListener("click", closeEmptyMessage)

defaultCity()