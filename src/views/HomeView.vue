<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useWeatherStore from '@stores/WeatherStore'
import { watch } from 'vue';


const cityInput = ref('')
const weatherStore = useWeatherStore()
const dialog = ref(weatherStore.errorDialog)



const sendCity = () => {
    weatherStore.setCity(cityInput.value)
    weatherStore.getWeather()
    cityInput.value = ''
}



watch(() => weatherStore.errorDialog, () => {
    if(weatherStore.errorDialog) {
        dialog.value = true
    }
})

watch(dialog, () => {
    if(!dialog.value) {
        weatherStore.setErrorDialog(false)
    }
})


// Hooks 

setInterval(async () => {
    await weatherStore.getWeather()
}, 60000)


onMounted(async () => {
    weatherStore.setRandomBackground()
    await weatherStore.getWeather()
})
</script>

<template>
    <!-- background-image: url('@/assets/backgrounds/grass.jpg'); -->

    <div class="wrapper" :style="[{backgroundImage: `url('/weather-app-vue-ts/backgrounds/${weatherStore.currentBackground}')`}]">
        <div class="wrapper__overlay">
            <div class="weather">
            <div class="weather__container">
                <div class="weather__info">
                    <div class="weather__city">
                        <div>
                            <div class="weather__city-title" style="font-weight: 500; font-size: 65px;">{{ weatherStore.weather.city }}</div>
                            <div class="weather__city-title">{{ weatherStore.weather.country }}</div>
                        </div>
                        
                        <div>
                            <div class="weather__city-time">{{ weatherStore.weather.localtime }}</div>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; text-align: end; gap: .2em">
                        <div style="display: flex; align-items: center; justify-content: flex-end;">
                            <div class="weather__city-icon"><img :src="weatherStore.weather.condition.icon" alt=""></div>
                            <div class="weather__temp">{{weatherStore.weather.temp}}°C</div>
                        </div>
                        <div class="weather__city-time">{{ weatherStore.weather.condition.text }}</div>
                        <div class="weather__city-time">Feels like {{ weatherStore.weather.feelsLike }}°С</div>
                        <div class="weather__city-time">Wind speed {{ weatherStore.weather.windSpeed }} km/h</div>
                    </div>
                </div>
                <div class="weather__search">
                    <input class="weather__search-input" @keypress.enter="sendCity" v-model="cityInput" placeholder="Enter your city">                        
                    <v-btn @click="sendCity" height="40px"  color="primary">
                        Search
                    </v-btn>
                </div>
                    <v-dialog
                        v-model="dialog"
                        width="auto"
                    >
                        <v-card>
                            <v-card-title>Invalid City</v-card-title>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
            </div>
        </div>
        </div>
    </div>
</template>



<style lang="scss">





.weather {
    width: 100%;
    min-height: 70%;
    &__container {
        justify-content: center;
        gap: 1em;
        font-family: 'Noto Sans', sans-serif;
        color: #fff;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    &__info {
        display: flex;
    }
    &__city {
        flex: 1 1 auto;
        height: 100%;
        font-weight: 300;
        gap: 5em;
        display: flex;
        flex-direction: column;
    }
    &__city-title {
        line-height: 1.2em;
        letter-spacing: 2px;
        font-size: 40px;
    }
    &__city-time {
        line-height: 1.2em;
        letter-spacing: 2px;
        font-size: 20px;
        font-weight: 300;
    }
    &__city-icon {
        height: 75px;
        width: 75px;
        & img {
            height: 75px;
            width: 75px;
        }
    }
    &__temp {
        font-size: 72px;
        font-weight: 300;
    }
    &__search {
        justify-content: center;
        display: flex;
        gap: .5em;
        &-input {
            letter-spacing: 2px;
            width: 100%;
            background-color: #fff;
            font-size: 15px;
            padding: 10px 20px;
            height: 100%;
            border-radius: 4px;
        }

    }
}




</style>