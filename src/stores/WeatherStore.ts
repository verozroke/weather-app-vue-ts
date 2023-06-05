import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import getRandomInt from '@/helpers/getRandomInt.js'
import backgrounds from '@/json/backgrounds.json' assert {type: "json"}

interface IWeatherCondition {
    text: string
    icon: string
}

interface IWeather {
    country: string
    city: string
    localtime: string
    temp: string
    condition: IWeatherCondition
    windSpeed: number
    feelsLike: number
}

type TypeTimeFormat = {
    weekday: string,
    year: string,
    month: string,
    day: string,
}

const useWeatherStore = defineStore(
    'weatherStore',
    () => {
        const city = ref('')
        const options: TypeTimeFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const errorDialog = ref(false)

        const currentBackground = ref('')

        const weather: Ref<IWeather> = ref({
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
        })

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

        const setRandomBackground = () => {
            currentBackground.value = backgrounds[getRandomInt(backgrounds.length)]
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
            setErrorDialog,
            currentBackground,
            setRandomBackground,
        }
    },
    {
        persist: true
    }
)

export default useWeatherStore
