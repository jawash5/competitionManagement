<template>
    <div id="mainWrap">
        <div class="mainContent">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/config.scss";
   #mainWrap {
       height: 100%;
   }
    .mainContent {
        width: 100%;
        height: 100%;
        min-height: 100vh;
        min-width: 420px;
        padding-top: $layoutHeader + 30;
        padding-left: $navMenu + 30;
        padding-right: 30px;
        box-sizing: border-box;
    }
    .content {
        width: 100%;
        height: 100%;
        min-height: 88vh;
        padding-top: 30px;
        padding-right: 30px;
        padding-left: 30px;
        box-sizing: border-box;
        background-color: #fff;
    }

    @media screen and (max-width: 420px){

        .mainContent {
            width: 100%;
            height: 100%;
            min-height: 100vh;
            min-width: 0;
            padding-top: $layoutHeader + 30;
            padding-left: $navMenu + 30;
            padding-right: 30px;
            box-sizing: border-box;
        }

        .content {
            position: absolute;
            left: 35vw;
            width: 60vw;
            height: 100%;
            min-height: 88vh;
            padding-top: 20px;
            padding-left: 10vw;
            padding-right: 10px;
            box-sizing: border-box;
            background-color: #fff;
        }

    }
</style>
