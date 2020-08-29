<template>
    <div id="myProject">
        <el-tabs type="border-card" tab-position="left" class="message">
            <el-tab-pane label="消息1" class="tabTitle"></el-tab-pane>
            <el-tab-pane label="消息2" class="tabTitle"></el-tab-pane>
            <el-tab-pane label="消息2" class="tabTitle"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "myMessage",
        data() {
            return{
                activeName:'create',
                statement:false
            }
        },
    }
</script>

<style lang="scss" scoped>
    #myProject {
        display: flex;
        flex-direction: row;
    }

    .message {
        width: 100%;
        height: 80vh;
        margin: 0 auto;
    }

    /deep/.el-tabs__item {
        font-family: "幼圆" , serif;
        width: 150px;
        height: 80px;
        font-size: 16px;
    }

</style>

