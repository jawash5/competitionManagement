<template>
    <div id="competition">
        <h3>12313{{ competitionName }}</h3>
    </div>
</template>

<script>
    export default {
        name: "competition",
        el: '#competition',
        date() {
            return {
                competitionName:'电子商务大赛',

            }
        }
    }
</script>

<style scoped>
    @import "../styles/global.css";

    #competition{
        height: 300px;
        background-color: #55a532;
    }
</style>