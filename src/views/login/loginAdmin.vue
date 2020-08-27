<template>
    <div id="login">
        <head-login :state="statement"></head-login>
        <div id="wrap">
            <div id="login_with_img">
                <img id="login_img" alt="讨论" src="../../assets/main/loginAdmin.png">
                <span class="login_hr"></span>
                <div id="login_wrap">
                    <h1 class="login_title">管 理 员 登 录</h1>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-ruleForm">
                        <el-form-item prop="username">
                            <el-input placeholder="账号" prefix-icon="iconshequ" v-model="ruleForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input placeholder="请输入密码" prefix-icon="iconmima" type="password" show-password clearable v-model="ruleForm.pass" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="buttons">
                        <el-button type="primary" round="true" @click="gotoAdmin">登录</el-button>
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
    import { login } from "@/api/login";

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
                statement:true,
                ruleForm: {
                    password: '',
                    username: ''
                },
                rules: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    username: [
                        { validator: checkUsername, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            gotoRegister: function () {
                this.$router.push("/register");
            },

            submitInfo: function () {
                if(this.ruleForm.username === '' || this.ruleForm.pass === '') {
                    this.$message.error('用户名或密码不能为空!');
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


<style lang="scss" scoped>
    #login {
        background-color: #f2f2f2;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 1200px;
        min-height: 700px;
    }

    #wrap {
        background-color: #f2f2f2;
        height: 80vh;
        display: flex;
        align-items: center;
    }

    #login_wrap {
        background-color: #FFFFFF;
        min-width: 320px;
        height: 320px;
        width: 320px;
        padding: 20px;
        margin: 0 auto;
        border-radius: 4px;
    }

    .login_hr {
        border:0.5px solid #DCDFE6;
        height:400px;
    }

    .login_title {
        color: black;
        margin: 30px;
        font-weight: 900;
        font-size: 30px;
        font-family: "幼圆" , serif;
        text-align: center;
    }

    #login_img {
        width: 400px;
        margin: 0 auto;
    }

    #login_with_img {
        background-color: #FFFFFF;
        margin: 0 auto;
        height: 500px;
        width: 1000px;
        display: flex;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    .login-ruleForm {
        margin: 50px 0;
    }

    .buttons {
        text-align: center;
    }
</style>