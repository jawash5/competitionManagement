<template>
    <div id="wrap">
        <div id="wrap_bg">

        </div>
        <div id="login_wrap">
            <h1 class="login_title">登    录</h1>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input placeholder="用户名" prefix-icon="iconshequ" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input placeholder="请输入密码" prefix-icon="iconmima" type="password" clearable v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button >注册</el-button>
        </div>
    </div>

</template>

<script>
    export default {
        name: "login",
        data() {
            const checkUsername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
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