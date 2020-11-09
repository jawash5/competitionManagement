<template>
    <div class="modifyPassword">
        <div></div>
        <el-card class="wrap">
            <div class="title">修 改 密 码</div>
            <el-form :model="form"
                     :rules="rule"
                     ref="ruleForm">
                <el-form-item label="新密码" prop="password">
                    <el-input v-model="form.password"
                              type="password"
                              show-password
                              prefix-icon="iconmima"
                              placeholder="11至20位，由数字和字母组成"
                              @keydown.enter.native="submit"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="checkPass">
                    <el-input v-model="form.checkPass"
                              type="password"
                              show-password
                              prefix-icon="iconmima"
                              placeholder="请重复密码"
                              @keydown.enter.native="submit">></el-input>
                </el-form-item>
            </el-form>
            <el-button class="btn--conform"
                       type="primary"
                       round
                       @click="submit">确认修改</el-button>
        </el-card>


        <my-footer></my-footer>
    </div>
</template>

<script>
    import MyFooter from "@/views/login/components/myFooter";
    import {validatePassword} from "@/utils/validator";
    import {modifyPass} from "@/api/login";
    export default {
        name: "modifyPassword",
        components: {MyFooter},
        data() {
            const validatePass = (rule, value, callback) => {
                if (!validatePassword(value)){
                    callback(new Error('长度为11至20位，由数字和字母组成'));
                } else {
                    if (this.form.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };

            const validatePass2 = (rule, value, callback) => {
                if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                form:{
                    password:'',
                    checkPass:''
                },

                rule:{
                    password: [
                        {  required: true, validator: validatePass, trigger: 'blur' },
                    ],
                    checkPass: [
                        {  required: true, validator: validatePass2, trigger: 'blur' },
                    ],
                }

            }
        },
        methods: {
            submit() {
                this.$refs['ruleForm'].validate( (valid) => {
                    if (valid) {
                        const data = {
                            token: this.$route.query.token,
                            password: this.form.password
                        }
                        modifyPass(data).then( response => {
                            if (response.data.message === '成功') {
                                this.$message.success('修改成功');
                                this.$store.dispatch('app/exit').then( () => {
                                    this.$router.push({
                                        path:'/login'
                                    })
                                }).catch( () => {
                                    this.$router.push({
                                        path:'/login'
                                    })
                                });
                            }
                        }).catch( error => {
                            this.$message.error(error.response.data);
                        })
                    } else {
                        return false;
                    }
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    .modifyPassword {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
        min-height: 450px;
        background-image: url("../../assets/main/modifyPass.jpg");
        background-repeat: no-repeat;
        background-size: cover;

        .wrap {
            width: 400px;
            margin: 0 auto;
            border-radius: 15px;

            .title {
                    color: #303133;
                    margin: 0 0 30px 0;
                    font-weight: 900;
                    font-size: 28px;
                    font-family: "幼圆" , serif;
                    text-align: center;
            }

            .el-form-item {
                &:first-child {
                    margin-bottom: 11px;
                }
            }

            .btn--conform {
                display: block;
                margin: 40px auto 10px auto;
            }
        }
    }

    @media screen and (max-width: 420px){
        .modifyPassword {
            .wrap {
                width: 90vw;
            }
        }

    }

</style>