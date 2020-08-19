<template>
    <div id="register">
        <head-login :state='true'></head-login>
        <div id="wrap">
            <div id="register_with_img">
                <img id="register_img" alt="讨论" src="../assets/main/register.png">
                <span class="register_hr"></span>
                <div id="register_wrap">
                    <h1 class="register_title">注&nbsp;&nbsp;册</h1>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" class="register-ruleForm">
                        <el-form-item prop="username">
                            <el-input placeholder="用户名"
                                      prefix-icon="iconshequ"
                                      v-model="ruleForm.username">
                            </el-input>
                        </el-form-item>

                        <el-form-item prop="pass">
                            <el-input placeholder="请输入密码"
                                      prefix-icon="iconmima"
                                      clearable
                                      type="password"
                                      v-model="ruleForm.pass">
                            </el-input>
                        </el-form-item>

                        <el-form-item prop="checkPass">
                            <el-input placeholder="请重复密码"
                                      prefix-icon="iconmima"
                                      clearable type="password"
                                      v-model="ruleForm.checkPass">

                            </el-input>
                        </el-form-item>

                        <el-form-item prop="name">
                            <el-input placeholder="学生姓名"
                                      prefix-icon="iconchuangzuo"
                                      v-model="ruleForm.name">

                            </el-input>
                        </el-form-item>

                        <el-form-item prop="ID">
                            <el-input placeholder="学号"
                                      prefix-icon="iconshouji"
                                      v-model="ruleForm.ID">

                            </el-input>
                        </el-form-item>
                        <el-form-item prop="mail">
                            <el-input placeholder="邮箱"
                                      prefix-icon="iconxiaoxi"
                                      v-model="ruleForm.mail">

                            </el-input>
                        </el-form-item>

                        <el-form-item prop="college">
                            <el-input placeholder="学院"
                                      prefix-icon="iconshouye"
                                      v-model="ruleForm.college">

                            </el-input>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" round>立即注册</el-button>
                    <el-button round @click="gotoLogin">登录</el-button>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headLogin from "@/components/headLogin";
    import myFooter from "@/components/myFooter";

    export default {
        name: "register",
        components: {
            'headLogin': headLogin,
            'myFooter': myFooter
        },
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
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
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            const validateMail = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入邮箱'));
                    } else if (
                        value.indexOf("@") !== -1 &&
                        value.indexOf(".") !== -1 &&
                        value.indexOf(".") > value.indexOf("@")+2){
                        callback();
                    } else {
                        callback(new Error('请输入正确的邮箱'));
                    }
                };
            return {
                ruleForm: {
                    username: '',
                    pass: '',
                    checkPass: '',
                    name: '',
                    ID:'',
                    mail:'',
                    college:'',
                },
                rules: {
                    username: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' },
                        { min: 6, max:20, message: '密码长度为6-20位', trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, message: '请输入正确的姓名', trigger: 'blur' }
                    ],
                    ID: [
                        { required: true, message: '请输入学号', trigger: 'blur' },
                        { min: 8, message: '请输入正确的学号', trigger: 'blur' }
                    ],
                    mail: [
                        { validator: validateMail, trigger: 'blur' }
                    ],
                    college: [
                        { required: true, message: '请输入学院全称', trigger: 'blur' },
                    ],
                }
            }
        },
        methods:{
            gotoLogin:function () {
                this.$router.push("login")
            },
            submitInfo: function () {
                //提交表单前验证
                //空值验证
                if(this.ruleForm.username === '' || this.ruleForm.password === '' ||
                    this.checkPass === '' || this.ruleForm.name === ''||
                    this.ruleForm.ID === '' || this.ruleForm.mail === ''|| this.ruleForm.college === '') {
                    this.$message.error('请填写完注册内容!');
                    return false;
                }
                //密码验证
                if(this.ruleForm.pass.length < 6 || this.ruleForm.pass.length > 20) {
                    return false;
                }
                //重复密码验证
                if(this.ruleForm.checkPass !== this.ruleForm.pass) {
                    return false;
                }
                //姓名验证
                if(this.ruleForm.pass.name < 2) {
                    return false;
                }
                //学号验证
                if(this.ruleForm.ID.length < 8) {
                    return false;
                }
                //邮箱验证
                if (this.mail.indexOf("@") !== -1 && this.mail.indexOf(".") !== -1 &&
                    this.mail.indexOf(".") > this.mail.indexOf("@")+2) {
                    return false;
                }

                const data = new FormData();
                data.append('username',this.ruleForm.username);
                data.append('password',this.ruleForm.pass);
                data.append('password',this.ruleForm.ID);
                data.append('password',this.ruleForm.name);
                data.append('password',this.ruleForm.college);
                data.append('password',this.ruleForm.mail);

                // register(data).then(response => {
                //     console.log(response);
                //     this.$router.push({
                //         path:'/login'
                //     })
                // }).catch(error => {
                //     this.$message.error('注册失败！');
                //     console.log(error);
                // });
            },
        }
    }
</script>

<style scoped src="../styles/register/register.css">
</style>