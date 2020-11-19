<template>
    <div class="login">
        <head-login :state="state"></head-login>
        <div class="login_with_img" v-loading="loading">
            <img class="login_img" alt="讨论" src="../../assets/main/login.png">
            <span class="login_hr"></span>
            <div class="login_wrap">
                <div class="login_title">登&nbsp;&nbsp;录</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-ruleForm" >
                    <el-form-item prop="username">
                        <el-input placeholder="用户名/手机号/学号"
                                  prefix-icon="iconshequ"
                                  v-model="ruleForm.username"
                                  @keyup.enter.native="submitInfo"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="请输入密码"
                                  prefix-icon="iconmima"
                                  type="password"
                                  show-password
                                  clearable
                                  v-model="ruleForm.password"
                                  @keyup.enter.native="submitInfo"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <router-link class="forgetPass" to="/forgetPassword">忘记密码?</router-link>
                <div class="buttons">
                    <el-button type="primary" round @click="submitInfo">登录</el-button>
                    <el-button round @click="gotoRegister">注册</el-button>
                </div>
            </div>
        </div>

        <my-footer></my-footer>
    </div>
</template>

<script>
    import headLogin from "@/views/login/components/headLogin";
    import myFooter from "@/views/login/components/myFooter";
    import {getCode} from "@/utils/app";
    import {getAvatar} from "@/api/userConsole";

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
                    return callback(new Error('账号/手机/学号不能为空'));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (value.length > 20 && value.length < 11) {
                    callback(new Error('密码格式错误'));
                } else {
                    callback();
                }
            };

            return {
                loading: false,//加载
                //表单信息
                ruleForm: {
                    username: '',
                    password: ''
                },
                //表单规则
                rules: {
                    username: [
                        { validator: checkUsername, trigger: 'blur' },
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' },
                    ],
                },
            };
        },
        computed:{
            //判断登录状态
            state() {
                return getCode() === '0';
            }
        },
        methods: {
            //注册
            gotoRegister() {
                this.$router.push("/register");
            },

            //登录信息提交
            submitInfo() {
                let that = this;
                //表单信息验证
                that.$refs['ruleForm'].validate( (valid) => {
                    if (valid) {
                        that.loading = true;//加载状态打开
                        const data = new FormData();
                        data.append('username',that.ruleForm.username);
                        data.append('password',that.ruleForm.password);

                        that.$store.dispatch("app/login", data).then( res => {
                            if (res === '参赛者') {
                                getAvatar().then( response => {
                                    const res = response.data.data;
                                    if (res.msg) {
                                        this.$store.dispatch('avatar/setAvatarUrl', res.msg)
                                    } else {
                                        this.$store.dispatch('avatar/setAvatarUrl', "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")
                                    }
                                }).finally( () => {
                                    that.$router.push({
                                        path: that.$route.query.redirect || '/checkCompetition',
                                        query: {
                                            token: that.$route.query.token //重定向后带参
                                        }
                                    });
                                    that.loading = false;//加载状态关闭
                                })
                            } else {
                                this.$store.dispatch('avatar/setAvatarUrl',
                                    "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png").then( () => {
                                    that.$router.push({
                                        path: that.$route.query.redirect || '/checkCompetition',
                                        query: {
                                            token: that.$route.query.token //重定向后带参
                                        }
                                    });
                                    that.loading = false;//加载状态关闭
                                })
                            }
                        }).catch(error => {
                            that.loading = false;
                            that.$message.error(error.response.data);
                        });
                    } else {
                        return false;
                    }
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .login {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
        min-height: 700px;
        background-color: #f7f7f7;

        .login_with_img {
            background-color: #FFFFFF;
            margin: 0 auto;
            height: 500px;
            width: 1000px;
            display: flex;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

            .login_img {
                width: 400px;
                margin: 0 auto;
            }

            .login_hr {
                border: .5px solid #DCDFE6;
                height:400px;
            }

            .login_wrap {
                height: 360px;
                width: 360px;
                padding: 20px;
                margin: 0 auto;

                .login_title {
                    color: #303133;
                    margin: 30px;
                    font-weight: 900;
                    font-size: 30px;
                    font-family: "幼圆" , serif;
                    text-align: center;
                }

                .login-ruleForm {
                    margin: 50px 0 30px 0;
                }

                .forgetPass {
                    float: right;
                    margin-right: 10px;
                    font-size: 12px;
                    color: #303133;

                    &:hover {
                        color: #409EFF;
                        text-decoration: underline;
                    }
                }

                .buttons {
                    text-align: center;

                    &:before {
                        content: "";
                        height: 30px;
                        display: block;
                        clear: both;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1000px) {

        .login {
            .login_with_img {
                width: 80vw;

                .login_hr {
                    display: none;
                }

                .login_img{
                    display: none;
                }
            }
        }
    }

    @media screen and (max-width: 420px){

        .login {
            .login_with_img{
                width: 100vw;
            }
        }
    }

    @media screen and (max-width: 363px){

        /deep/.el-input__inner{
            width: 90vw;
        }
    }

</style>
