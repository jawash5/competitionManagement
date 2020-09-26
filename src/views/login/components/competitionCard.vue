<template>
    <div class="card">
        <div class="competitionName">
            <div class="title"><span style="font-size: 20px">{{ competition.id }}. </span>{{ competition.name }}</div>
            <el-divider></el-divider>
            <div class="time">开始时间：{{ competition.start }}</div>
            <div class="time">结束时间：{{ competition.end }}</div>
            <div class="div-60"></div>
            <el-button type="primary" size="small" round @click="getCompetitionDetail()">查看详情</el-button>
        </div>
    </div>
</template>

<script>

    export default {
        name: "competitionCard",
        data() {
            return{}
        },
        methods:{
            getCompetitionDetail () {
                this.$router.push({
                    path: '/competitionDetail',
                    query: {
                        id: this.competition.id
                    }
                });
            }
        },
        props:{
            competition:{
                required: true,
                type: Object,
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/config.scss";

    .card {
        margin: 15px;
        width: 280px;
        height: 250px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

        .competitionName {
            text-align: center;
            margin: 20px;

            .title {
                font-size: 24px;
                font-family: "幼圆" , serif;
            }

            .time {
                text-align: center;
                font-size: 16px;
                margin-bottom: 10px;
                color: #303133;
                font-weight: 500;
            }
        }

    }

    .card:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, .18), 0 0 12px rgba(0, 0, 0, .04);
        transition: box-shadow 0.5s;
    }

</style>