<template>
    <div id="register">
        <head-login :state='false'></head-login>
        <div id="wrap">
            <div id="register_with_img">
                <img id="register_img" alt="讨论" src="../../assets/main/register.png">
                <span class="register_hr"></span>
                <div id="register_wrap">
                    <h1 class="register_title">注&nbsp;&nbsp;册</h1>
                    <el-form class="register-ruleForm"
                             :model="ruleForm"
                             :rules="rules"
                             ref="ruleForm"
                             size="small"
                             label-width="80px">
                        <el-form-item label="用户名" prop="username">
                            <el-input prefix-icon="iconshequ"
                                      v-model="ruleForm.username"></el-input>
                        </el-form-item>

                        <el-form-item label="密码" prop="password">
                            <el-input placeholder="由数字和字母组成，不少于11位"
                                      prefix-icon="iconmima"
                                      type="password"
                                      show-password
                                      clearable
                                      v-model="ruleForm.password"></el-input>
                        </el-form-item>

                        <el-form-item label="重复密码" prop="checkPass">
                            <el-input prefix-icon="iconmima"
                                      type="password"
                                      show-password
                                      clearable
                                      v-model="ruleForm.checkPass"></el-input>
                        </el-form-item>

                        <el-form-item label="姓名" prop="name">
                            <el-input prefix-icon="iconchuangzuo"
                                      v-model="ruleForm.name"></el-input>
                        </el-form-item>

                        <el-form-item label="学号" prop="studentNo">
                            <el-input placeholder="学号为8位数字"
                                      prefix-icon="iconshouji"
                                      v-model="ruleForm.studentNo"></el-input>
                        </el-form-item>

                        <el-form-item label="邮箱" prop="email">
                            <el-input prefix-icon="iconxiaoxi"
                                      v-model="ruleForm.email"></el-input>
                        </el-form-item>

                        <el-form-item label="电话" prop="phoneNo">
                            <el-input prefix-icon="icondianhua"
                                      v-model="ruleForm.phoneNo"></el-input>
                        </el-form-item>

                        <el-form-item label="学校" prop="university">
                            <el-select style="display: block; width: 100%"
                                       @change="getSchool"
                                       v-model="ruleForm.university"
                                       filterable>
                                <span slot="prefix"><i class="iconshouye"></i></span>
                                <el-option
                                        v-for="item in universityOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="学院" prop="school">
                            <el-select style="display: block; width: 100%"
                                       v-model="ruleForm.school"
                                       filterable>
                                <span slot="prefix"><i class="iconshouye"></i></span>
                                <el-option
                                        v-for="item in schoolOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="buttons">
                        <el-button type="primary" round @click="submitInfo">立即注册</el-button>
                        <el-button round @click="gotoLogin">登录</el-button>
                    </div>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headLogin from "@/views/login/components/headLogin";
    import myFooter from "@/views/login/components/myFooter";
    import { register, getUniversity, getSchool } from "@/api/login";
    import {validatePassword, validateEmail,validatePhoneNo, validateStudentNumber} from "@/utils/validator";

    export default {
        name: "register",
        components: {
            'headLogin': headLogin,
            'myFooter': myFooter
        },
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (!validatePassword(value)){
                    callback(new Error('长度至少为11位，由数字和字母组成'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };

            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            const validateMail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱'));
                } else if(!validateEmail(value)){
                    callback(new Error('请输入正确的邮箱'));
                } else {
                    callback();
                }
            };

            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else if(!validatePhoneNo(value)){
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            };
            const validateStudentNo = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入学号'));
                } else if(!validateStudentNumber(value)){
                    callback(new Error('学号为8位数字'));
                } else {
                    callback();
                }
            };



            return {
                ruleForm: {
                    username: '',
                    password: '',
                    checkPass:'',
                    studentNo: '',
                    name: '',
                    school: '',
                    email: '',
                    phoneNo: '',
                    university: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        {  required: true, validator: validatePass, trigger: 'blur' },
                    ],
                    checkPass: [
                        {  required: true, validator: validatePass2, trigger: 'blur' },
                    ],
                    studentNo: [
                        { required: true, validator: validateStudentNo, trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, message: '请输入正确的姓名', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, validator: validateMail, trigger: 'blur' }
                    ],
                    phoneNo: [
                        { required: true, validator: validatePhone, trigger: 'blur' }
                    ],
                    university: [
                        { required: true, message: '请选择学校', trigger: 'blur' },
                    ],
                    school: [
                        { required: true, message: '请选择学院', trigger: 'blur' },
                    ],
                },
                universityOptions:[],//学校选项
                schoolOptions:[],//学院选项
            }
        },
        methods:{
            gotoLogin() {
                this.$router.push("login")
            },
            submitInfo() {
                // 提交表单前验证
                // 空值验证
                if(this.ruleForm.username === '' || this.ruleForm.password === '' || this.ruleForm.name === ''||
                    this.ruleForm.studentNo === '' || this.ruleForm.email === ''|| this.ruleForm.university === ''
                    || this.ruleForm.school === '' || this.ruleForm.phoneNo === '') {
                    this.$message.error('请填写完整注册内容!');
                    return false;
                }
                //密码验证
                if(!validatePassword(this.ruleForm.password)) {
                    this.$message.error('密码格式不正确!');
                    return false;
                }
                //姓名验证
                if(this.ruleForm.name.length < 2) {
                    this.$message.error('请输入正确的姓名!');
                    return false;
                }
                //学号验证
                if(this.ruleForm.studentNo.length !== 8) {
                    this.$message.error('请输入正确的学号!');
                    return false;
                }
                //邮箱验证
                if (!validateEmail(this.ruleForm.email)) {
                    this.$message.error('请输入正确的邮箱!');
                    return false;
                }

                //手机验证
                if(!validatePhoneNo(this.ruleForm.phoneNo)) {
                    this.$message.error('请输入正确的手机号!');
                    return false;
                }

                register(this.ruleForm).then(response => {
                    console.log(response);
                    this.$message({
                        message: '注册成功！',
                        type: 'success'
                    });
                    this.$router.push({
                        path:'/login'
                    })
                }).catch(error => {
                    this.$message.error(error.response.data);
                });
            },
            getUniversity() {
                getUniversity().then( response => {
                    const universities = response.data.data;
                    for (const university of universities) {
                        this.universityOptions.push({label:university, value:university})
                    }
                })
            },
            getSchool() {
                getSchool(this.ruleForm.university).then( response => {
                    const schools = response.data.data;
                    for (const school of schools) {
                        this.schoolOptions.push({label:school, value:school})
                    }
                })
            }
        },
        mounted() {
            this.getUniversity()
        }
    }
</script>

<style lang="scss" scoped>
    #register {
        background-color: #f2f2f2;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 1200px;
        min-height: 800px;
    }

    #register_with_img {
        display: flex;
        align-items: center;
        height: 700px;
        width: 1000px;
        background-color: #FFFFFF;
        margin: 60px auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    #register_img {
        width: 400px;
        margin: 0 auto;
    }

    .register_hr {
        border:.5px solid #DCDFE6;
        height:500px;
    }

    .register_title {
        color: black;
        margin: -80px 0 30px 0;
        font-weight: 900;
        font-size: 30px;
        font-family: "幼圆" , serif;
        text-align: center;
    }

    #register_wrap {
        background-color: #fff;
        min-width: 350px;
        height: 420px;
        width: 350px;
        padding: 20px;
        margin: 0 auto;
        border-radius: 4px;
    }

    .register-ruleForm {
        margin: 30px 0;
    }

    .buttons {
        text-align: center;
    }
</style>