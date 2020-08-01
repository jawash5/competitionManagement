<template>
    <div id="login_head">
        <h1 id="login_head_title">竞赛管理系统</h1>
        <p>查看比赛</p>
    </div>
</template>

<script>
    export default {
        name: "head"
    }
</script>

<style scoped>

    #login_head {
        background-color: #409EFF;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #login_head_title {
        font-family:"等线" , serif;
        color: #f2f2f2;
        padding: 0 100px;
    }

    p {
        font-family:"等线" , serif;
        color: white;
        padding: 0 100px;
        font-size: 14px;
    }
</style>