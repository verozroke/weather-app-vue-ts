<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
    <RouterView />
</template>

<style lang="scss">
@import url('@styles/nullstyle.scss');
@import url('@styles/fontstyle.scss');

html {
    overflow: hidden !important;
}

.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    align-items: center;
    min-height: 100vh;
    height: 100vh;
    font-family: 'Noto Sans', sans-serif;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('@/assets/backgrounds/grass.jpg');
    &__overlay {
        backdrop-filter: blur(5px);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px 20px;
        align-items: center;
        width: 100%;
        background-color: #00000057;
    }
}

[class*="__container"] {
    max-width: 900px;
    margin: 0 auto;
    font-size: 16px;
    color: #000;
    font-weight: 400;
    font-style: normal;   
}


input::-webkit-input-placeholder       {opacity: 1; transition: opacity 0.2s ease;}
input::-moz-placeholder                {opacity: 1; transition: opacity 0.2s ease;}
input:-moz-placeholder                 {opacity: 1; transition: opacity 0.2s ease;}
input:-ms-input-placeholder            {opacity: 1; transition: opacity 0.2s ease;}
input:focus::-webkit-input-placeholder {opacity: 0; transition: opacity 0.2s ease;}
input:focus::-moz-placeholder          {opacity: 0; transition: opacity 0.2s ease;}
input:focus:-moz-placeholder           {opacity: 0; transition: opacity 0.2s ease;}
input:focus:-ms-input-placeholder      {opacity: 0; transition: opacity 0.2s ease;}


</style>
