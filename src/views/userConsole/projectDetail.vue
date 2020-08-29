<template>
    <div id="exitProject">
        <div id="wrapTitle">新建项目</div>
        <div id="projectForm">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label=" " prop="type">
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

                <el-form-item label="项目名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="队伍名称" prop="teamName">
                    <el-input v-model="ruleForm.teamName"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="队长姓名"  prop="leader">
                            <el-input v-model="ruleForm.leader"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="队长学号" prop="leaderId">
                            <el-input v-model="ruleForm.leaderId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="指导老师" prop="teacher">
                            <el-input v-model="ruleForm.teacher"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="联系手机" prop="telephoneNumber">
                            <el-input v-model="ruleForm.telephoneNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱地址" prop="mail">
                            <el-input v-model="ruleForm.mail"></el-input>
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
                                <el-input class="labelFor" v-model="ruleForm.members[index].no" placeholder="请输入学号" size="small"></el-input>
                            </el-col>
                            <el-col :span="6" :offset="2">
                                <el-button size="small" type="danger" v-if="index !== 0" @click="deleteTeammate(index)">删除</el-button>
                                <el-button size="small" type="success" @click="addTeammate">新增</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div id="buttons">
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "projectDetail" ,
        data() {
            const validateFiles = (rule, value, callback) => {
                    if (this.fileList === '') {
                        callback(new Error('请上传文件'));
                    } else {
                        callback();
                    }
                };

            return{
                inputVisible: false,
                inputValue: '',
                fileList: [],
                options: [{
                    value: '选项1',
                    label: '电子商务竞赛'
                }, {
                    value: '选项2',
                    label: '互联网+'
                }],
                competitionValue: '',
                ruleForm: {
                    name: '',
                    teamName:'',
                    leader:'',
                    leaderId:'',
                    telephoneNumber:'',
                    mail: '',
                    members: [
                        { name:'', no:'' }
                        ],
                    teacher:''
                },
                rules: {
                    type: [
                        { required: true, message: '请选择比赛', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' },
                    ],
                    teamName: [
                        { required: true, message: '请填写队伍名称', trigger: 'blur' }
                    ],
                    leader: [
                        { required: true, message: '请填写队长名称', trigger: 'blur' }
                    ],
                    leaderId: [
                        { required: true, message: '请填写队长学号', trigger: 'blur' }
                    ],
                    telephoneNumber: [
                        { required: true, message: '请填写联系手机', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '请填写队长手机', trigger: 'blur' }
                    ],
                    teacher: [
                        { required: true, message: '请填写指导老师', trigger: 'blur' }
                    ],
                    upload:[
                        { required: true, validator: validateFiles, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            //前端验证还没有加
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            showClose: true,
                            message: '创建成功！',
                            type: 'success'
                        });
                        this.$router.push("/myProject")
                    } else {
                        console.log('创建失败!!');
                        return false;
                    }
                });
                // submitTeam().then(response => {
                //
                //     }
                // ).catch(error =>{
                //
                //     }
                // )
            },

            addTeammate() {
                this.ruleForm.members.push({name:'', no: ''})
            },

            deleteTeammate(index) {
                if(index === 0) {
                    return false
                } else {
                    this.ruleForm.members.splice(index, 1)
                }
            },

        },
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

        #buttons {
            margin: 20px auto;
        }

        .teammates {
            border: 1px dashed #bebebe;
            border-radius: 4px;
            padding: 10px 20px;
        }

        .labelFor {
            width: 70%;
            margin-left: 10px;
        }
    }


</style>