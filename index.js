const container =document.querySelector('.container');
const search =document.querySelector('.search-box button');
const error404 =document.querySelector('.not-found');
const weatherBox =document.querySelector('.weather-box');
const weatherDeitails =document.querySelector('.weather-deitails');

search.addEventListener('click', () => {
    const APIkey='a27a0d9cc1a847a27355fc25c427d522';
    const city = document.querySelector('.search-box input').value;

    if (city==='')
        return;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}
    &units=metric&appid=${APIkey}`).then( response => response.json()).then(
    json =>{
        if (json.cod==='404'){
                container.style.height = '300px';
                weatherBox.style.display ='none';
                weatherDeitails.style.display ='none';
                error404.style.display = 'flex';
                error404.classList.add('fadeIn');
                return;
        }
        error404.style.display ='none'
        error404.classList.remove('fadeIn');

        const image =document.querySelector('.weather-box img');
        const temprature=document.querySelector('.weather-box .temp');
        const description=document.querySelector('.weather-box .descript');
        const humidity= document.querySelector('.humidity div span');
        const wind= document.querySelector('.wind div span');

        switch (json.weather[0].main){
            case 'Clear':
                image.src ='images/icons8-sun-48.png';
                break;

            case 'Clouds':
                image.src ='images/icons8-clouds-48.png';
                break;

            case 'Rain':
                image.src ='images/icons8-heavy-rain-48.png';
                break;

            case 'Snow':
                image.src ='images/icons8-snow-48.png';
                break;

            case 'Haze':
                image.src ='images/icons8-full-moon-48.png';
                break;

            default: image.src='';
        }

        temprature.innerHTML= `${parseInt(json.main.temp)}<span> &#8451;</span>`;
        description.innerHTML=`${json.weather[0].description}`;
        humidity.innerHTML=`${json.main.humidity}%`;
        wind.innerHTML=`${parseInt(json.wind.speed)}km/h`;

        weatherBox.style.display='flex';
        weatherDeitails.style.display='flex';
        weatherBox.classList.add('fadeIn');
        weatherDeitails.classList.add('fadeIn');
        container.style.height='400px';
        
    })
})