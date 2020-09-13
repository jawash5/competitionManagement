<template>
    <div class="card">
        <div class="competitionName">
            <div class="title"><span style="font-size: 20px">{{ competition.id }}. </span>{{ competition.name }}</div>
            <div class="div-30"></div>
            <div class="time">报名开始：{{ competition.start }}</div>
            <div class="time">报名结束：{{ competition.end }}</div>
            <div class="div-60"></div>
            <el-button type="danger" size="small" @click="getCompetitionDetail()">查看详情</el-button>
        </div>

        <el-dialog
                title="比赛详情"
                :visible.sync="competitionInfo"
                width="700px">
                <el-form ref="form" :model="competitionDetail" label-width="80px" disabled>
                    <el-form-item label="比赛名称">
                        <el-input v-model="competitionDetail.name"></el-input>
                    </el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="报名开始">
                                <el-input v-model="competitionDetail.start"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="报名结束">
                                <el-input v-model="competitionDetail.end"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="比赛介绍">
                        <el-input  type="textarea" :rows="12" autosize resize="none" v-model="competitionDetail.information"></el-input>
                    </el-form-item>
                </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {competitionDetail} from "@/api/login";
    export default {
        name: "competitionCard",
        data() {
            return{
                competitionInfo: false,
                competitionDetail:{},
            }
        },
        methods:{
            getCompetitionDetail:function () {
                this.competitionInfo = true;
                competitionDetail(this.competition.id).then(response => {
                    this.competitionDetail = response.data.data;
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

    /deep/.el-input.is-disabled .el-input__inner {
        cursor: default;
        background-color: #fff;
        color: #606266;
    }

    /deep/.el-textarea.is-disabled .el-textarea__inner {
        cursor: default;
        background-color: #fff;
        color: #606266;
    }

</style>