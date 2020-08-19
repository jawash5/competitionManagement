<template>
    <div id="login">
        <head-login :state="true"></head-login>
        <div id="wrap">
            <div id="login_with_img">
                <img id="login_img" alt="讨论" src="../assets/main/login.png">
                <span class="login_hr"></span>
                <div id="login_wrap">
                    <h1 class="login_title">登&nbsp;&nbsp;录</h1>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-ruleForm">
                        <el-form-item prop="username">
                            <el-input placeholder="用户名"
                                      prefix-icon="iconshequ"
                                      v-model="ruleForm.username"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input placeholder="请输入密码"
                                      prefix-icon="iconmima"
                                      type="password"
                                      show-password
                                      clearable
                                      v-model="ruleForm.password"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" round @click="submitInfo">登录</el-button>
                    <el-button round @click="gotoRegister">注册</el-button>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import { login } from "@/api/login";
    import headLogin from "@/components/headLogin";
    import myFooter from "@/components/myFooter";

    export default {
        name: "login",
        components: {
            'headLogin': headLogin,
            'myFooter': myFooter
        },
        data() {
            //验证信息
            const checkUsername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
            };

            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { validator: checkUsername, trigger: 'blur' },
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' },
                    ],
                }
            };
        },
        methods: {
            gotoRegister: function () {
                this.$router.push("/register");
            },

            submitInfo: function () {
                if(this.ruleForm.username === '' || this.ruleForm.password === '') {
                    this.$message.error('用户名或密码不能为空!');
                    return false;
                }

                if(this.ruleForm.password.length < 6 || this.ruleForm.password.length > 20) {
                    this.$message.error('密码输入有误!');
                    return false;
                }

                const data = new FormData();
                data.append('username',this.ruleForm.username);
                data.append('password',this.ruleForm.password);

                login(data).then(response => {
                    console.log(response);
                    this.$router.push({
                        path:'/myProject'
                    })
                }).catch(error => {
                    this.$message.error('账号或密码错误');
                    console.log(error);
                });
            },
        },
    }
</script>

<style scoped src="../styles/login/login.css"></style>
<style scoped>
    @import "../styles/global.css";
</style>