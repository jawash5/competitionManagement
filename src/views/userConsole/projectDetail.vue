<template>
    <div id="exitProject">
        <div id="wrapTitle">新建项目</div>
        <div id="projectForm">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label=" " prop="type">
                    <el-select v-model="competitionValue" placeholder="请选择比赛" style="float: left">
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
                    <el-col :span="12">
                        <el-form-item label="队长姓名"  prop="leader">
                            <el-input v-model="ruleForm.leader"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="队长学号" prop="leaderId">
                            <el-input v-model="ruleForm.leaderId"></el-input>
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
                    <el-tag
                            :key="tag"
                            v-for="tag in ruleForm.members"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                        成员学号：{{tag}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            placeholder="请输入学号"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="$event.target.blur"
                            @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加新成员</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div id="buttons">
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
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
                    members: [],
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            //标签删除成员事件
            handleClose(tag) {
                this.ruleForm.members.splice(this.ruleForm.members.indexOf(tag), 1);
                // console.log(this.ruleForm.members)
            },

            //添加新成员按钮
            showInput() {
                this.inputVisible = true;
                this.$nextTick( ()=> {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            //学号输入框的键盘enter事件与失去焦点事件
            handleInputConfirm() {
                let inputValue = this.inputValue;
                console.log(inputValue)
                if ((inputValue+'').length !== 8){
                    this.$message.error("学号输入错误");
                    console.log(inputValue)
                } else if (this.ruleForm.members.indexOf(inputValue) !== -1){
                    this.$message.error("学号重复输入");
                } else if (inputValue) {
                    this.ruleForm.members.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            //文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                console.log(file, fileList);
                // console.log(fileList);
            },

            //点击文件列表中已上传的文件时的钩子
            handlePreview(file) {
                console.log(file);
            },

            //删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },

            //文件上传成功时的钩子
            handleSuccess(response, file, fileList) {
                this.fileList.name = file.name;
                this.fileList.url = file.url;
                console.log(response, file, fileList);
            },

            handleError() {
                this.$message.error("文件上传失败，请重试")
            }

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
    }

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

    /deep/.el-tag + .el-tag {
        margin-left: 10px;
    }

    /deep/.button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    /deep/.input-new-tag {
        width: 120px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    /deep/.el-input.is-disabled .el-input__inner {
        cursor: default;
    }

    /deep/.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
        cursor: default;
    }
</style>