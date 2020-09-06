<template>
    <div class="card">
        <div class="competitionName">
            <div class="title">{{ competition.name }}</div>
            <div class="div-30"></div>
            <div class="time">开始时间：{{ competition.start }}</div>
            <div class="time">结束时间：{{ competition.end }}</div>
            <div class="div-60"></div>
            <el-button type="danger" size="small" @click="competitionInfo = true">查看详情</el-button>
        </div>

        <el-dialog
                title="比赛详情"
                :visible.sync="competitionInfo">
            <el-form ref="form" :model="competition" label-width="80px" disabled>
                <el-form-item label="比赛名称">
                    <el-input v-model="competition.name"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="报名时间">
                            <el-input v-model="competition.competitionTime"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="比赛时间">
                            <el-input v-model="competition.deadline"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="比赛介绍">
                    <el-input  type="textarea" :rows="12" autosize resize="none" v-model="competition.information"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "competitionCardUser",
        data() {
            return{
                competitionInfo: false,
            }
        },
        methods:{},
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

    .card:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
        transition: box-shadow 0.3s;
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