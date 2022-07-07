'use strict'


const btn_send = document.querySelector('.btn_send');
const btn_geolocation = document.querySelector('.btn_geolocation');
const input = document.querySelector('.input')
const text = document.querySelector('.text')
let mapLink = document.createElement('a')
    


const url = 'wss://echo-ws-service.herokuapp.com';
let websocket;

// Подключение происходит при обновлении страницы
document.addEventListener('DOMContentLoaded', ()=> {
    websocket = new WebSocket(url);
    websocket.onopen = function() {
        console.log('onopen')
    }
    websocket.onclose = function() {
        console.log('onclose')
    }
    websocket.onmessage = function(evt) {
        writeToChat(evt.data)
    }
    websocket.onerror = function(evt) {
        writeToChat('<span style = "color: red;">ERROR: </span>' + evt.data)
    }
})


btn_send.addEventListener('click', ()=> {
    let value = input.value;
    
    writeToChat(`<div class = "text_right"><div class = "styleText"> Отправил:${value}</div></div>`)
    websocket.send(`<div class = "text_left"><div class = "styleTextServer"> Сервер:${value}</div></div>`)
    input.value = " ";
})

btn_geolocation.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(succes, error)
    
    mapLink.href = ' ';
    mapLink.textContent = ' ';
})
// Функция добавления в чат
function writeToChat(message) {
    let phrase = document.createElement('div');
    phrase.innerHTML = message;
    text.appendChild(phrase)
}

// Получаем координаты, Записывааем линк в див, добавляем классы
const succes = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = 'Гео-локация';
    mapLink.classList.add('styleTextLink')
    let phrase2 = document.createElement('div');
    phrase2.appendChild(mapLink);
    phrase2.classList.add('text_right')
    text.appendChild(phrase2)

}
const error = () => {
    console.log('Невозможно получить геолокацию')
}