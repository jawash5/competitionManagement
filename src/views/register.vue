<template>
    <div id="register">
        <head-login></head-login>
        <div id="wrap">
            <div id="register_with_img">
                <img id="register_img" alt="讨论" src="../assets/main/register.png">
                <span class="register_hr"></span>
                <div id="register_wrap">
                    <h1 class="register_title">注&nbsp;&nbsp;册</h1>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" class="register-ruleForm">
                        <el-form-item prop="username">
                            <el-input placeholder="账号" prefix-icon="iconshequ" v-model="ruleForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="pass">
                            <el-input placeholder="请输入密码" prefix-icon="iconmima" clearable type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="checkPass">
                            <el-input placeholder="请重复密码" prefix-icon="iconmima" clearable type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="name">
                            <el-input placeholder="学生姓名" prefix-icon="iconchuangzuo" v-model="ruleForm.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="ID">
                            <el-input placeholder="学号" prefix-icon="iconshouji" v-model="ruleForm.ID" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="mail">
                            <el-input placeholder="邮箱" prefix-icon="iconxiaoxi" v-model="ruleForm.mail" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="college">
                            <el-input placeholder="学院" prefix-icon="iconshouye" v-model="ruleForm.college" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" round="true">立即注册</el-button>
                    <el-button round="true" @click="gotoLogin">登录</el-button>
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
                    } else if (value.indexOf("@") !== -1 && value.indexOf(".") !== -1 && value.indexOf(".") > value.indexOf("@")+2){
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
                        { validator: validatePass, trigger: 'blur' }
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
                        { min: 3, message: '请输入正确的学院名', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            gotoLogin:function () {
                this.$router.push("login")
            }
        }
    }
</script>

<style scoped>
    /*@import "../styles/global.css";*/
    @import "../styles/register/register.css";
</style>