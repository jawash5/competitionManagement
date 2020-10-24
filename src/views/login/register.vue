<template>
    <div id="register">
        <head-login :state='false'></head-login>
        <div id="wrap">
            <div id="registerWithImg">
                <img id="registerImg" alt="讨论" src="../../assets/main/register.png">
                <span class="registerHr"></span>
                <div id="registerWrap">
                    <h1 class="registerTitle">注&nbsp;&nbsp;册</h1>
                    <el-form class="registerRuleForm"
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
                            <el-input placeholder="长度为11至20位，由数字和字母组成"
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

                        <el-form-item label="性别" prop="gender">
                            <el-radio v-model="ruleForm.gender" label="男"></el-radio>
                            <el-radio v-model="ruleForm.gender" label="女"></el-radio>
                        </el-form-item>

                        <el-form-item label="学号" prop="studentNo">
                            <el-input placeholder="学号为8位数字"
                                      prefix-icon="iconshouji"
                                      v-model="ruleForm.studentNo"></el-input>
                        </el-form-item>

                        <el-form-item label="学院" prop="school">
                            <el-select style="display: block; width: 100%"
                                       @change="getMajor"
                                       v-model="ruleForm.school"
                                       clearable
                                       filterable
                                       allow-create
                                       placeholder="若无所在学院，请手动键入">
                                <span slot="prefix"><i class="iconshouye"></i></span>
                                <el-option
                                        v-for="item in schoolOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="专业" prop="major">
                            <el-select style="display: block; width: 100%"
                                       v-model="ruleForm.major"
                                       clearable
                                       filterable
                                       allow-create
                                       placeholder="若无所在专业，请手动键入">
                                <span slot="prefix"><i class="iconpaihangbang"></i></span>
                                <el-option
                                        v-for="item in majorOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="班级" prop="className">
                            <el-input prefix-icon="iconpengyouquan"
                                      v-model="ruleForm.className"
                                      placeholder="班级为8位班级编号"></el-input>
                        </el-form-item>

                        <el-form-item label="邮箱" prop="email">
                            <el-input prefix-icon="iconxiaoxi"
                                      v-model="ruleForm.email"
                                      placeholder="队长必须填写此项"></el-input>
                        </el-form-item>

                        <el-form-item label="电话" prop="phoneNo">
                            <el-input prefix-icon="icondianhua"
                                      v-model="ruleForm.phoneNo"
                                      placeholder="队长必须填写此项"></el-input>
                        </el-form-item>

                    </el-form>
                    <div class="buttons">
                        <el-button type="primary" round @click="submitInfo">立即注册</el-button>
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
    import { register, getSchool, getMajor } from "@/api/login";
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
                    callback(new Error('长度为11至20位，由数字和字母组成'));
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
                    university: '杭州电子科技大学',
                    major:'',
                    gender:'',
                    className:''
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
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'blur' },
                    ],
                    email: [
                        { required: false, validator: validateMail, trigger: 'blur' }
                    ],
                    phoneNo: [
                        { required: false, validator: validatePhone, trigger: 'blur' }
                    ],
                    school: [
                        { required: true, message: '请选择学院', trigger: 'blur' },
                    ],
                    major: [
                        { required: true, message: '请选择专业', trigger: 'blur' },
                    ],
                    className: [
                        { min:8, max:8, required: true, message: '请输入正确的班级号', trigger: 'blur' },
                    ],
                },
                schoolOptions:[],//学院选项
                majorOptions:[]//专业列表
            }
        },
        methods:{
            submitInfo() {
                // 提交表单前验证
                // 空值验证
                if(this.ruleForm.username === '' || this.ruleForm.password === '' || this.ruleForm.name === ''||
                    this.ruleForm.studentNo === '' || this.ruleForm.school === '' || this.ruleForm.major === ''||
                    this.ruleForm.gender === '' || this.ruleForm.className === '') {
                    this.$message.error('请填写完整注册内容!');
                    return false;
                }
                //密码验证
                if(!validatePassword(this.ruleForm.password)) {
                    this.$message.error('密码格式不正确!');
                    return false;
                }

                //重复密码验证
                if(this.ruleForm.checkPass !== this.ruleForm.password) {
                    this.$message.error('两次密码不一致!');
                    return false;
                }

                //姓名验证
                if(this.ruleForm.name.length < 2) {
                    this.$message.error('请输入正确的姓名!');
                    return false;
                }

                //学号验证
                if(!validateStudentNumber(this.ruleForm.studentNo)) {
                    this.$message.error('请输入正确的学号!');
                    return false;
                }

                //班级
                if(this.ruleForm.className.length !== 8) {
                    this.$message.error('请输入正确的班级号!');
                    return false;
                }

                register(this.ruleForm).then( () => {
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
            getSchool() {
                this.schoolOptions = [];
                getSchool(this.ruleForm.university).then( response => {
                    const schools = response.data.data;
                    for (const school of schools) {
                        this.schoolOptions.push({label:school, value:school})
                    }
                })
            },
            getMajor() {
                this.majorOptions = [];
                getMajor(this.ruleForm.school).then( response => {
                    const majors = response.data.data;
                    for (const major of majors) {
                        this.majorOptions.push({label:major, value:major})
                    }
                })
            }
        },
        mounted() {
            this.getSchool()
        }
    }
</script>

<style lang="scss" scoped>
    #register {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 420px;
        min-height: 800px;
    }

    #registerWithImg {
        display: flex;
        align-items: center;
        height: 900px;
        width: 1100px;
        background-color: #FFFFFF;
        margin: 60px auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    #registerImg {
        width: 400px;
        margin: 0 auto;
    }

    .registerHr {
        border:.5px solid #DCDFE6;
        height:800px;
    }

    .registerTitle {
        color: black;
        margin: -60px 0 30px 0;
        font-weight: 900;
        font-size: 30px;
        font-family: "幼圆" , serif;
        text-align: center;
    }

    #registerWrap {
        background-color: #fff;
        min-width: 400px;
        height: 550px;
        width: 400px;
        padding: 20px;
        margin: 0 auto;
        border-radius: 4px;
    }

    .registerRuleForm {
        margin: 30px 0;
    }

    .buttons {
        text-align: center;
    }

    @media screen and (max-width: 420px){

        #register {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-width: 0;
            min-height: 0;
        }

        img{
            display: none;
        }

        #registerWithImg {
            top: 10vh;
            display: flex;
            align-items: center;
            width: 100vw;
            height: 110vh;
            background-color: #FFFFFF;
            margin: 60px auto;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
        }

        #registerWrap {
            background-color: #fff;
            min-width: 0;
            height: 550px;
            width: 60vw;
            padding: 20px;
            margin: 0 auto;
            border-radius: 4px;
        }

        /deep/ .el-form-item{
            margin-top: 3.2vh;
        }

        /deep/ .el-input__inner{
            width: 67vw;
        }

        /deep/.registerTitle{
            font-size: 20px;
        }

        /deep/ .el-form.registerRuleForm{
            margin-left: -20vw;
        }

    }

    @media screen and (max-width:370px ) {
        @media screen and (max-height: 661px) {

            /deep/ .registerRuleForm {
                margin: 0;
                top: 20vh;
            }

            #registerWrap {
                background-color: #fff;
                min-width: 0;
                height: 450px;
                width: 60vw;
                padding: 20px;
                margin: 0 auto;
                border-radius: 4px;
            }

            #registerWithImg {
                display: flex;
                align-items: center;
                width: 100vw;
                height: 120vh;
                background-color: #FFFFFF;
                margin: 60px auto;
                box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
            }
        }
    }

</style>
