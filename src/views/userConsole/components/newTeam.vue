<template>
    <div>
        <el-dialog title="活动报名"
                   :visible.sync="visible"
                   width="800px"
                   center
                   :show-close="false"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div id="projectForm">
                <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="比赛名称" prop="competitionName">
                        <el-input v-model="competitionName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-divider></el-divider>

                    <el-form-item label="队伍名称" prop="teamName">
                        <el-input v-model="ruleForm.teamName"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="队长姓名"  prop="leader">
                                <el-input v-model="ruleForm.leader" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="队长学号" prop="leaderId">
                                <el-input v-model="ruleForm.leaderId" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

            <span slot="footer">
                <el-button @click="dialogClose()">取 消</el-button>
                <el-button type="primary" @click="submitForm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {applyCompetition, personalInfo} from "@/api/userConsole";
    import {getCode, getRole} from "@/utils/app";

    export default {
        name: "newTeam",
        props:{
            visible:{
                type:Boolean,
                require:true,
                default:false,
            },
            competitionName:{
                type:String,
                require:true,
            },
            id:{
                type:Number,
                require:true,
            }
        },
        data() {
            return {
                dialogVisible:true,
                ruleForm: {
                    teamName:'',
                    leader:'',
                    leaderId:'',
                },
                //提交的表单
                finalForm:{
                    competitionId: 0,
                    groupName: "",
                },
            }
        },
        methods: {
            dialogClose() {
                this.$emit('dialogClose')
            },
            //前表单提交，端验证还没有加
            submitForm() {
                this.finalForm.competitionId = this.id;
                this.finalForm.groupName = this.ruleForm.teamName;
                this.finalForm.teammateSet = [
                    {name:this.ruleForm.leader, studentNo:this.ruleForm.leaderId, isLeader:true,}
                    ];

                //提交报名比赛信息
                applyCompetition(this.finalForm).then(response => {
                    const code = response.data.code;
                    if(code === 0) {
                        this.$message({
                            showClose: true,
                            message: '创建成功！',
                            type: 'success'
                        });
                        this.$emit('success')
                        this.dialogClose();
                    }
                }).catch(error => {
                    this.$message({
                        showClose: true,
                        message: error.response.data.message + '!',
                        type: 'error'
                    });
                })
            },
            //获取队长信息
            getLeader() {
                if(getCode() === '0' && getRole() === '参赛者') {
                    personalInfo().then(response => {
                        this.ruleForm.leader = response.data.data.name;
                        this.ruleForm.leaderId = response.data.data.studentNo + "";
                    })
                }
            }
        },
        mounted() {
            this.getLeader();
        }
    }
</script>

<style lang="scss" scoped>
    #projectForm {
        margin: 0 auto;
        background-color: #FFFFFF;
        padding: 50px;
    }

    .teammates {
        border: 1px dashed #bebebe;
        border-radius: 4px;
        padding: 10px 20px;

        .el-button {
            padding: 5px;
        }
    }

    .labelFor {
        width: 70%;
        margin-left: 10px;
    }

    /deep/.el-input.is-disabled .el-input__inner {
        cursor: auto;
        color: #606266;
    }
</style>