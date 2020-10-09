<template>
    <div id="register">
        <head-login :state='false'></head-login>
        <div id="wrap">
            <div id="register_with_img">
                <img id="register_img" alt="讨论" src="../../assets/main/register.png">
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

                        <el-form-item prop="password">
                            <el-input placeholder="请输入密码"
                                      prefix-icon="iconmima"
                                      clearable
                                      v-model="ruleForm.password">
                            </el-input>
                        </el-form-item>

                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item prop="name">
                                    <el-input placeholder="学生姓名"
                                              prefix-icon="iconchuangzuo"
                                              v-model="ruleForm.name">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item prop="studentNo">
                                    <el-input placeholder="学号"
                                              prefix-icon="iconshouji"
                                              v-model="ruleForm.studentNo">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item prop="email">
                            <el-input placeholder="邮箱"
                                      prefix-icon="iconxiaoxi"
                                      v-model="ruleForm.email">
                            </el-input>
                        </el-form-item>

                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item prop="university">
                                    <el-input placeholder="学校"
                                              prefix-icon="iconshouye"
                                              v-model="ruleForm.university">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item prop="school">
                                    <el-input placeholder="学院"
                                              prefix-icon="iconshouye"
                                              v-model="ruleForm.school">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item prop="phoneNo">
                            <el-input placeholder="电话"
                                      prefix-icon="icondianhua"
                                      v-model="ruleForm.phoneNo">
                            </el-input>
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
    import { register } from "@/api/login";

    export default {
        name: "register",
        components: {
            'headLogin': headLogin,
            'myFooter': myFooter
        },
        data() {
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
                    password: '',
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
                        { min: 6, max:20, message: '密码长度为9-20位', trigger: 'blur' },
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    studentNo: [
                        { required: true, message: '请输入学号', trigger: 'blur' },
                        { min: 8, max:8, message: '请输入正确的学号', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, message: '请输入正确的姓名', trigger: 'blur' }
                    ],
                    school: [
                        { required: true, message: '请输入学院全称', trigger: 'blur' },
                    ],
                    email: [
                        { validator: validateMail, trigger: 'blur' }
                    ],
                    phoneNo: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max:11, message: '请输入正确的手机号', trigger: 'blur' }
                    ],
                    university: [
                        { required: true, message: '请输入学校全称', trigger: 'blur' },
                    ],
                }
            }
        },
        methods:{
            gotoLogin:function () {
                this.$router.push("login")
            },
            submitInfo: function () {
                // 提交表单前验证
                // 空值验证
                if(this.ruleForm.username === '' || this.ruleForm.password === '' || this.ruleForm.name === ''||
                    this.ruleForm.studentNo === '' || this.ruleForm.email === ''|| this.ruleForm.university === ''
                    || this.ruleForm.school === '' || this.ruleForm.phoneNo === '') {
                    this.$message.error('请填写完整注册内容!');
                    return false;
                }
                //密码验证
                if(this.ruleForm.password.length < 9 || this.ruleForm.password.length > 20) {
                    this.$message.error('请输入正确的密码!');
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
                if (this.ruleForm.email.indexOf("@") === -1 && this.ruleForm.email.indexOf(".") === -1 &&
                    this.ruleForm.email.indexOf(".") < this.ruleForm.email.indexOf("@")+2) {
                    this.$message.error('请输入正确的邮箱!');
                    return false;
                }

                //学院验证
                if(this.ruleForm.school.length <= 2) {
                    this.$message.error('请输入正确的学院!');
                    return false;
                }

                //手机验证
                if(this.ruleForm.phoneNo.length !== 11) {
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
                    this.$message.error('注册失败！');
                    console.log(error);
                });
            },
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

    #wrap {
        background-color: #f2f2f2;
        height: 80vh;
        display: flex;
        align-items: center;
    }

    #register_with_img {
        background-color: #FFFFFF;
        margin: 0 auto;
        height: 600px;
        width: 1000px;
        display: flex;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    #register_img {
        width: 400px;
        margin: 0 auto;
    }

    .register_hr {
        border:0.5px solid #DCDFE6;
        height:400px;
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
        background-color: #FFFFFF;
        min-width: 320px;
        height: 320px;
        width: 320px;
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