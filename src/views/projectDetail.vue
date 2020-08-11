<template>
    <div id="personalCenter">
        <head-login :state="statement"></head-login>
        <div id="myProject">
            <personal-menu :active="active"></personal-menu>
            <div id="exitProject">
                <div id="projectForm">
                    <h1 id="competitionName">{{ competitionName }}</h1>
                    <el-divider></el-divider>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
                                学号：{{tag}}
                            </el-tag>
                            <el-input
                                    class="input-new-tag"
                                    placeholder="请输入学号"
                                    v-if="inputVisible"
                                    v-model="inputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="handleInputConfirm"
                                    @blur="handleInputConfirm"
                            >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加新成员</el-button>
                        </el-form-item>
                        <el-form-item label="文件上传" prop="upload">
                            <el-upload
                                    class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :file-list="fileList">
                                <el-button size="small" type="primary" >点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">格式为pdf、word，不超过20M，文件数量限一个。</div>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                </div>
                <div id="buttoms">
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headLogin from "@/components/headLogin";
    import myFooter from "@/components/myFooter";
    import personalMenu from "@/components/personalMenu";
    import myProject from "@/views/myProject";

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
                statement:false,
                active:myProject,
                inputVisible: false,
                inputValue: '',
                competitionName:'浙江省电子商务竞赛',
                fileList: [
                    {name: "活动专家", url:'http://192.168.1.16:8080/C:/Users/Jawash/Pictures/Saved Pictures/1.jpg'}
                ],
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
                    members:[
                        { required: true, message: '请添加项目成员', trigger: 'blur'}
                    ],
                    upload:[
                        { required: true, validator: validateFiles, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleClose(tag) {
                this.ruleForm.members.splice(this.ruleForm.members.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick( ()=> {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.ruleForm.members.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },

            handlePreview(file) {
                console.log(file);
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        },
        components: {
            "headLogin":headLogin,
            "myFooter":myFooter,
            "personalMenu":personalMenu,
        },
    }
</script>

<style scoped src="../styles/personalCenter/personalCenter.css"></style>
<style scoped src="../styles/personalCenter/projectDetail.css"></style>