import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

interface WeatherCondition {
    text: string
    icon: string
}

interface Weather {
    country: string
    city: string
    localtime: string
    temp: string
    condition: WeatherCondition
    windSpeed: number
    feelsLike: number
}

const useWeatherStore = defineStore(
    'weatherStore',
    () => {
        const city = ref('')
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const errorDialog = ref(false)

        const weather = ref({
            country: '',
            city: '',
            localtime: '',
            temp: '',
            condition: {
                icon: '',
                text: ''
            },
            windSpeed: 0,
            feelsLike: 0
        }) as Ref<Weather>

        async function getWeather() {
            try {
                const { data } = await axios.get('http://api.weatherapi.com/v1/current.json', {
                    params: {
                        key: '6a76d74f90cc4a41b1194955232705',
                        q: city.value ? city.value : 'Astana'
                    }
                })
                weather.value.city = data.location.name
                weather.value.country = data.location.country
                weather.value.temp = Math.floor(data.current.temp_c).toString()
                weather.value.condition.icon = data.current.condition.icon
                weather.value.condition.text = data.current.condition.text
                weather.value.windSpeed = data.current.wind_kph
                weather.value.feelsLike = data.current.feelslike_c
                // @ts-ignore
                weather.value.localtime = new Date(data.location.localtime).toLocaleDateString("en-US", options)
            } catch (error) {
                errorDialog.value = true
                city.value = ''
            }
        }

        const setErrorDialog = (bool: boolean) => {
            errorDialog.value = bool
        }

        const setCity = (newCity: string) => {
            city.value = newCity
        }

        return {
            getWeather,
            weather,
            setCity,
            city,
            errorDialog,
            setErrorDialog
        }
    },
    {
        persist: true
    }
)

export default useWeatherStore
