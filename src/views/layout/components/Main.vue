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
        min-width: 1400px;
        padding-top: $layoutHeader + 30;
        padding-left: $navMenu + 30;
        padding-right: 30px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .content {
        width: 100%;
        height: 100%;
        min-height: 88vh;
        padding-top: 30px;
        padding-right: 30px;
        padding-left: 30px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
    }
</style>