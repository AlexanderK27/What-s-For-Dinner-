<template>
    <div class="alert-list" >
        <div 
            v-for="alert in alerts"
            :key="'alert' + alert.id"
            :class="'alert ' + alert.type"
        >
            <p>{{alert.message}}</p>
            <div class="countdown"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: mapGetters(['alerts'])
}
</script>

<style lang="less" scoped>
.alert-list {
    position: fixed;
    top: 40px;
    right: 40px;
    text-align: left;
    z-index: 10000;

    .alert {
        position: relative;
        width: 300px;
        min-height: 50px;
        margin-bottom: 16px;
        padding: 10px 16px;
        color: #0F0F0F;
        font-size: 16px;
        font-weight: bold;
        animation: exit 0.5s 3s both;

        &.neutral {
            background-color: #94A1AC;
            .countdown { background-color: #6C757D; }
        }

        &.success {
            background-color: #77FF77;
            .countdown { background-color: #4AFF4A; }
        }

        &.danger {
            background-color: #DE7479;
            .countdown { background-color: #DE4850; }
        }

        &.warning {
            background-color: #FFDC74;
            .countdown { background-color:#FFD041; }
        }

        .countdown {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 8px;
            animation: timer 3s linear;
            animation-iteration-count: 1;
        }

        @keyframes exit {
            0% {
                transform: translateX(0);
                opacity: 1;
            }
            100% {
                transform: translateX(1000px);
                opacity: 0;
            }
        }

        @keyframes timer {
            0% { width: 100%; }
            100% { width: 0%; }
        }
    }
}
</style>