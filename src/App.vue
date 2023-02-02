<template>
    <div class="box" v-watermark="{ text: 'VUE', rotate: -20 }">
        <img class="logo" src="@/assets/logo.svg" alt="">
    </div>
</template>

<script setup>
</script>

<style>
body {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

#app {
    width: 100%;
    height: 100%;
}
.box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.logo {
    width: 16vw;
    height: 16vw;
}
</style>