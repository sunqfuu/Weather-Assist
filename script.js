document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.querySelector('.city-input')
    const searchBtn = document.querySelector('.search-btn')
    const notFoundSection = document.querySelector('.not-found')
    const searchCitySection = document.querySelector('.search-city')
    const weatherInfoSection = document.querySelector('.weather-info')

    const apiKey = '';

    searchBtn.addEventListener('click', () => {
        if(cityInput.value.trim() != '') {
            updateWeatherInfo(cityInput.value)
            cityInput.value = ''
            cityInput.blur()
            console.log(document.querySelector('.search-btn'));
        }
    })

    cityInput.addEventListener('keydown', (event) => {
        if(event.key == 'Enter' && 
            cityInput.value.trim() != ''
        ) {
            updateWeatherInfo(cityInput.value)
            cityInput.value = ''
            cityInput.blur()
        }
        console.log(event)
    })
 
    async function getFetchData(endPoint, city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`

        const response = await fetch(apiUrl)

        return response.json()
    }

    async function updateWeatherInfo(city) {
        const weatherData = await getFetchData('weather', city)

        if (weatherData.cod != 200) {
            showDisplaySection(notFoundSection)
            return
        }

        showDisplaySection(weatherInfoSection)
    }

    function showDisplaySection(_section) {
        [weatherInfoSection, searchCitySection, notFoundSection]
            .forEach(section => section.style.display = 'none')
        
        section.style.display = 'flex'
    }
})
