// This is the entry file
import './style.css';
import App from './app.js'
import scene from './scene.js'


//create new elements
function createDOM(data){
    const $weatherDisplay = document.createElement('div')
    $weatherDisplay.setAttribute('class','weatherDisplay')
    const $cityName = document.createElement('h1')
    $cityName.setAttribute('class','cityName')
    const $temp = document.createElement('p')
    $temp.setAttribute('class','temp')

    // get data
    const cityName = data.name
    const cityTemp = data.main.temp

    // append els
    $cityName.innerHTML = cityName
    $temp.innerHTML = cityTemp
    document.body.appendChild($weatherDisplay)
    $weatherDisplay.appendChild($cityName)
    $weatherDisplay.appendChild($temp)
}

window.addEventListener('load', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=4fee3a6f62b269677bdf61ab19a03fa8&units=metric')
        .then(response => response.json())
        .catch(err => alert(err))
        .then(data => {
            // createDOM(data)
            const codeId = data.weather[0].id
            new App(scene,codeId)
        })
})