<template>
    <div id="app">
        <router-view />
        <AppAlert />
    </div>
</template>

<script>
import AppAlert from "./components/ui/AppAlert";
export default {
    name: "App",
    components: {
        AppAlert,
    },
};
</script>

<style lang="less">
@import "./styles/main.less";
</style>
