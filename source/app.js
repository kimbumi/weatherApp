const $weatherDisplay = document.querySelector('.weatherDisplay')
const $inputValue = document.querySelector('.inputValue')
const $button = document.querySelector('.button')

$button.addEventListener('click',()=>{
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+$inputValue.value+'&appid=4fee3a6f62b269677bdf61ab19a03fa8&units=metric')
    .then(response => response.json())
    .then(data => {
        const name = data.name
        const temp = data.main.temp
        console.log(data)
    })
    .catch(reason => {
        console.log(reason)
    })
})


const date = new Date()
console.dir(date)