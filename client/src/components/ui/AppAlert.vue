<template>
    <div class="alert-list">
        <div v-for="alert in alerts" :key="'alert' + alert.id" :class="'alert ' + alert.type">
            <p>{{alert.message}}</p>
            <div class="countdown"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: mapGetters(["alerts"]),
};
</script>

<style lang="less" scoped>
.alert-list {
    position: fixed;
    top: 40px;
    right: 40px;
    text-align: left;
    z-index: 25;

    .alert {
        position: relative;
        width: 300px;
        min-height: 50px;
        margin-bottom: 16px;
        padding: 10px 16px;
        color: #0f0f0f;
        font-size: 16px;
        font-weight: bold;
        animation: exit 0.5s 2.4s both;

        &.neutral {
            background-color: @color_neutral;
            .countdown {
                background-color: @color_neutral_dark;
            }
        }

        &.success {
            background-color: @color_success_light;
            .countdown {
                background-color: @color_success;
            }
        }

        &.danger {
            background-color: @color_danger_light;
            .countdown {
                background-color: @color_danger;
            }
        }

        &.warning {
            background-color: @color_warning_light;
            .countdown {
                background-color: @color_warning;
            }
        }

        .countdown {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 8px;
            animation: timer 2.4s linear;
            animation-iteration-count: 1;
        }

        @keyframes exit {
            0% {
                transform: translateX(0);
                opacity: 1;
            }
            100% {
                width: 0;
                height: 0;
                padding: 0;
                overflow: hidden;
                transform: translateX(1000px);
                opacity: 0;
            }
        }

        @keyframes timer {
            0% {
                width: 100%;
            }
            100% {
                width: 0%;
            }
        }
    }
}

@media screen and (max-width: 440px) {
    .alert-list {
        right: 10px;
    }
}
</style>