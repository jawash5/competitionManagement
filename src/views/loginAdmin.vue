<template>
    <div id="login">
        <head-login></head-login>
        <div id="wrap">
            <div id="login_with_img">
                <img id="login_img" alt="讨论" src="../assets/main/loginAdmin.png">
                <span class="login_hr"></span>
                <div id="login_wrap">
                    <h1 class="login_title">管 理 员 登 录</h1>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-ruleForm">
                        <el-form-item prop="username">
                            <el-input placeholder="账号" prefix-icon="iconshequ" v-model="ruleForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="pass">
                            <el-input placeholder="请输入密码" prefix-icon="iconmima" type="password" show-password clearable v-model="ruleForm.pass" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" round="true">登录</el-button>
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
        name: "login",
        components: {
            'headLogin': headLogin,
            'myFooter': myFooter
        },
        data() {
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
                    pass: '',
                    username: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    username: [
                        { validator: checkUsername, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
        }
    }
</script>
<style scoped>
    @import "../styles/global.css";
    @import "../styles/login/login.css";
</style>