<template>
    <div class="card">
        <div class="competitionName">
            <span class="title2" v-if="competition.hasOwnProperty('year')">{{ competition.year }}年 </span>
            <span class="title2" v-if="competition.hasOwnProperty('session')">第 {{ competition.session }} 届</span>
            <div :class="titleClass">{{ competition.name }}</div>
            <el-divider></el-divider>
            <div class="time">开始：{{ competition.start }}</div>
            <div class="time">结束：{{ competition.end }}</div>
            <div class="div-30"></div>
            <el-button type="primary" size="medium" round @click="getCompetitionDetail()">查看详情</el-button>
        </div>
    </div>
</template>

<script>

    export default {
        name: "competitionCard",
        data() {
            return{}
        },
        computed:{
            titleClass() {
                if (this.competition.name.length > 10) {
                    return 'title--long';
                } else {
                    return 'title'
                }
            }
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
        border-radius: 15px;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

        .competitionName {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            text-align: center;
            height: 210px;
            padding: 20px 0;

            .title2 {
                font-size: 18px;
                font-family: "幼圆" , serif;
            }

            .title {
                margin-top: 10px;
                padding: 0 2em;
                font-size: 22px;
                font-family: "幼圆" , serif;
                font-weight: 500;
            }

            .title--long {
                margin-top: 10px;
                padding: 0 2em;
                font-size: 16px;
                font-family: "幼圆" , serif;
                font-weight: 500;
            }

            .time {
                text-align: center;
                font-size: 16px;
                line-height: 1.5;
                color: #303133;
                font-weight: 500;
            }

            /deep/.el-divider--horizontal {
                margin: 10px 0 10px 0;
            }
        }

    }

    .card:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, .18), 0 0 12px rgba(0, 0, 0, .04);
        transition: box-shadow 0.5s;
    }

    @media screen and (max-width: 420px){

    }

</style>
