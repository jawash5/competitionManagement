<template>
    <div id="competition">
        <h1 id="competitionName">比赛名称:&nbsp;&nbsp;&nbsp;&nbsp;{{ competitionInfo.name }}</h1>
        <div id="competitionDetail">
            <p><span class="subTitle">比赛时间：</span>{{ competitionInfo.time }}</p>
            <el-divider direction="vertical"></el-divider>
            <p><span class="subTitle">比赛要求：</span>{{ competitionInfo.request }}</p>
        </div>
        <el-divider></el-divider>
        <p id="competitionDisc"><span class="subTitle">赛事简介：</span>{{ competitionInfo.discribe }}</p>
    </div>
</template>

<script>
    export default {
        name: "competition",
        props:{
          competitionInfo: Object,
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>
    #competition{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin: 70px 10px;
        padding: 20px 20px;
        border-radius: 30px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border: 1px solid #409EFF;
    }

    #competitionName {
        font-family: "幼圆" , serif;
    }

    #competitionDetail {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px 20px 0 20px;
        font-size: 16px;
    }

    .el-divider {
        background-color: #409EFF;
    }

    .subTitle {
        font-weight: 600;
        font-size: 16px;
    }

    #competitionDisc {
        font-size: 14px;
        text-align: left;
        text-indent: 2em;
        line-height: 1.5em;
    }
</style>