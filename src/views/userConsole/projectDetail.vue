<template>
    <div id="exitProject">
        <el-page-header @back="goBack" content="比赛列表" class="pull-left"></el-page-header>
        <div id="wrapTitle">新建项目</div>
        <div id="projectForm">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item>
                    <el-select v-model="competitionValue" placeholder="请选择比赛" class="pull-left">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-divider></el-divider>

                <el-form-item label="队伍名称" prop="teamName">
                    <el-input v-model="ruleForm.teamName"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label=""  prop="leader">
                            <el-input v-model="ruleForm.leader" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="队长学号" prop="leaderId">
                            <el-input v-model="ruleForm.leaderId" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="项目成员" prop="members">
                    <div class="teammates">
                        <el-row v-for="(item, index) in ruleForm.members" :key="item.id">
                            <el-col :span="8">
                                <label for="">姓名</label>
                                <el-input class="labelFor" v-model="ruleForm.members[index].name" placeholder="请输入姓名" size="small"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <label for="">学号</label>
                                <el-input class="labelFor" v-model="ruleForm.members[index].studentNo" placeholder="请输入学号" size="small"></el-input>
                            </el-col>
                            <el-col :span="6" :offset="2">
                                <el-button type="text" @click="addTeammate" style="font-size: 30px;">
                                    <i class="el-icon-circle-plus"></i>
                                </el-button>
                                <el-button type="text" @click="deleteTeammate(index)" style="font-size: 30px;">
                                    <i class="el-icon-remove"></i>
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-form-item>

<!--                    <el-dialog-->
<!--                            title="作品上传"-->
<!--                            :visible.sync="DialogVisible"-->
<!--                            width="50%"-->
<!--                            center>-->

<!--                        <div class="step">-->
<!--                            <el-steps :active="1" finish-status="success" align-center>-->
<!--                                <el-step title="初赛"></el-step>-->
<!--                                <el-step title="复赛"></el-step>-->
<!--                                <el-step title="决赛"></el-step>-->
<!--                            </el-steps>-->
<!--                        </div>-->

<!--                        <div class="div-30"></div>-->

<!--                        <div class="upload">-->
<!--                            <el-upload-->
<!--                                    class="upload-demo"-->
<!--                                    action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                                    multiple-->
<!--                                    :limit="3"-->
<!--                                    :file-list="fileList">-->
<!--                                <el-button size="small" type="primary">点击上传</el-button>-->
<!--                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--                            </el-upload>-->
<!--                        </div>-->

<!--                        <span slot="footer" class="dialog-footer">-->
<!--                            <el-button @click="DialogVisible = false">取 消</el-button>-->
<!--                            <el-button type="primary" @click="DialogVisible = false">确 定</el-button>-->
<!--                        </span>-->
<!--                    </el-dialog>-->


            </el-form>
        </div>

        <div id="buttons">
            <el-button type="primary" @click="submitForm()">立即创建</el-button>
        </div>
    </div>
</template>

<script>
    import {competitionList} from "@/api/login";
    import {applyCompetition,personalInfo} from "@/api/userConsole";
    export default {
        name: "projectDetail" ,
        data() {
            return{
                options: [],//比赛选择框
                competitionValue: this.$route.query.id || '',//选择的比赛
                ruleForm: {
                    teamName:'',
                    leader:'',
                    leaderId:'',
                    members: [
                        { name:'', studentNo:''}
                    ],
                },
                //提交的表单
                finalForm:{
                    competitionId: 0,
                    groupName: "",
                    teammateSet:[]
                },
            }
        },
        methods: {
            //页头返回
            goBack() {
                this.$router.push('/viewCompetition')
            },
            //获取比赛列表
            getCompetitionList() {
                competitionList().then(response => {
                    const data = response.data.data;
                    for(let i=0; i<data.length; i++) {
                        this.options.push({
                            value: data[i].id,
                            label: data[i].name
                        })
                    }
                })
            },
            //前表单提交，端验证还没有加
            submitForm() {
                //前端验证
                if(this.competitionValue === "") {
                    this.$message.error('请选择比赛!');
                    return false;
                }
                if(this.ruleForm.teamName === '') {
                    this.$message.error('请输入队伍名称!');
                    return false;
                }
                if(this.ruleForm.leader === "" || this.ruleForm.leaderId === "") {
                    this.$message.error('请输入队长信息!');
                    return false;
                }

                this.finalForm.competitionId = parseInt(this.competitionValue);
                this.finalForm.groupName = this.ruleForm.teamName;
                this.finalForm.teammateSet.push({
                    name:this.ruleForm.leader,
                    studentNo:parseInt(this.ruleForm.leaderId),
                    isLeader:true
                })
                const members = this.ruleForm.members;
                if(members[0].name !== '' && members[0].studentNo !== '') {
                    for(let i=0; i<members.length; i++) {
                        this.finalForm.teammateSet.push({
                            name: members[i].name,
                            studentNo:parseInt(members[i].studentNo),
                            isLeader:false
                        })
                    }
                }
                console.log(this.finalForm)
                //提交报名比赛信息
                applyCompetition(this.finalForm).then(response => {
                    const code = response.data.code;
                    if(code === 0) {
                        this.$router.push('/myProject')
                        this.$message({
                            showClose: true,
                            message: '创建成功！',
                            type: 'success'
                        });
                    }
                }).catch(error => {
                    this.$message({
                        showClose: true,
                        message: error.response.data.message + '!',
                        type: 'error'
                    });
                })
            },
            //添加队员
            addTeammate() {
                this.ruleForm.members.push({name:'', studentNo: ''})
            },
            //删除队员
            deleteTeammate(index) {
                if(index === 0) {
                    return false
                } else {
                    this.ruleForm.members.splice(index, 1)
                }
            },
            //获取队长信息
            getLeader() {
                personalInfo().then(response => {
                    this.ruleForm.leader = response.data.data.name;
                    this.ruleForm.leaderId = response.data.data.studentNo;
                })
            }
        },
        mounted() {
            this.getCompetitionList();
            this.getLeader();
        }
    }
</script>

<style lang="scss" scoped>

    #exitProject {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0 auto;
        background-color: #FFFFFF;

        #wrapTitle {
            font-size: 26px;
            margin: 0 auto;
            font-family: "幼圆" , serif;
        }

        #projectForm {
            margin: 0 auto;
            background-color: #FFFFFF;
            padding: 50px;
        }

        .step {
            line-height: normal;

        }

        #buttons {
            margin: 20px auto;
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
    }


</style>
