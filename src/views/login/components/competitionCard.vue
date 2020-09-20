<template>
    <div :class="cardStyle">
        <div class="competitionName">
            <div class="title"><span style="font-size: 20px">{{ competition.id }}. </span>{{ competition.name }}</div>
            <div class="div-30"></div>
            <div class="time">开始时间：{{ competition.start }}</div>
            <div class="time">结束时间：{{ competition.end }}</div>
            <div class="div-60"></div>
            <el-button type="danger" size="small" round @click="getCompetitionDetail()">查看详情</el-button>
        </div>
    </div>
</template>

<script>
    import {competitionDetail} from "@/api/login";
    import {getCode} from "@/utils/app";

    export default {
        name: "competitionCard",
        data() {
            return{}
        },
        computed:{
            cardStyle() {
                if(getCode() === "0") {
                    return 'cardUser';
                } else {
                    return 'card'
                }
            }
        },
        methods:{
            getCompetitionDetail () {
                competitionDetail(this.competition.id).then(response => {
                    const competitionInfo = response.data.data;
                    console.log(competitionInfo)
                    this.$store.dispatch('competition/setCompetitionInfo', JSON.stringify(competitionInfo));
                    sessionStorage.setItem('competitionInfo', JSON.stringify(competitionInfo));
                    this.$router.push('/competitionDetail');
                })
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
                font-weight: 600;
            }

            .time {
                text-align: center;
                font-size: 16px;
                margin-bottom: 10px;
            }
        }

    }

    .card:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, .18), 0 0 12px rgba(0, 0, 0, .04);
        transition: box-shadow 0.5s;
    }

    .cardUser {
        margin: 15px;
        width: 280px;
        height: 250px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-radius: 5px;
        background-color: #f7f7f7;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

        .competitionName {
            text-align: center;
            margin: 20px;

            .title {
                font-size: 24px;
                font-family: "幼圆" , serif;
                font-weight: 600;
                color: #303133;
            }

            .time {
                text-align: center;
                font-size: 16px;
                margin-bottom: 10px;
                color: #303133;
            }
        }
    }

    .cardUser:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
        transition: box-shadow 0.3s;
    }

</style>