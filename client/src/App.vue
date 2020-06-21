<template>
    <div id="app">
        <router-view />
        <AppAlert />
    </div>
</template>

<script>
import AppAlert from './components/ui/AppAlert'
export default {
    name: 'App',
    components: {
        AppAlert
    }
}
</script>

<style lang="less">
body {
    margin: 0;
    padding: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
