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
            <el-form ref="form" :model="form" label-width="80px" disabled>
                <el-form-item label="比赛名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="报名时间">
                            <el-input v-model="form.competitionTime"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="比赛时间">
                            <el-input v-model="form.deadline"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="比赛要求">
                    <el-input type="textarea" :rows="6" autosize resize="none" v-model="form.request"></el-input>
                </el-form-item>
                <el-form-item label="比赛介绍">
                    <el-input  type="textarea" :rows="12" autosize resize="none" v-model="form.disc"></el-input>
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
                form:{
                    name:'电子商务竞赛',
                    competitionTime:'2020/08/08-2020/08/08',
                    deadline:'2020/08/08-2020/08/08',
                    request:'三人一下',
                    disc:'全国大学生电子商务“创新、创意及创业”挑战赛（以下简称“三创赛”）' +
                        '是由全国电子商务创新产教联盟主办，由“三创赛”竞赛组织委员会统一策' +
                        '划、组织、管理与实施。“三创赛”由校赛、省赛和国赛三级竞赛组成，分别' +
                        '由教育部认可的全国高校提出申请，经“三创赛”竞赛组织委员批准分别组成' +
                        '全国决赛承办单位、分省选拔赛承办单位和各参赛学校具体实施全国性三级学科性竞赛。'
                },
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