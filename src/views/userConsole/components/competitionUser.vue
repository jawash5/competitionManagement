<template>
    <div id="competition">
        <div id="newHead">
            <el-page-header @back="goBack" content="详情页面" class="goBack"></el-page-header>
        </div>
        <div id="detail">
            <div class="form">
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
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "competition",
        props:{
          competitionName: String,
        },
        data() {
            return {
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
        methods:{
            goBack:function () {
                this.$router.push("/viewCompetition");
            }
        },

        mounted: {
            // getcompetition(this.competitionName).then(response => {
            //     this.competitionInfo = response.data;
            // }).catch(error => {
            //     console.log(error)
            // })
        }
    }
</script>

<style lang="scss" scoped>
    #competition{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fff;
    }

    .goBack {
        margin: 10px 0 0 10px;
    }

    #detail {
        background-color: white;
        width: 80%;
        height: 600px;
        margin: 0 auto;

        .form {
            width: 70%;
            margin: 70px auto;
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
    }

</style>