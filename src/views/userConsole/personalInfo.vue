<template>
    <div>
        <div class="wrapTitle">个人资料</div>
        <div class="infoForm">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名：">
                    <br class="diff">
                    <el-input v-model="form.username" :disabled="isDisabled"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名：">
                            <br class="diff">
                        <el-input v-model="form.name" :disabled="isDisabled" class="itemInput"></el-input>
                    </el-form-item></el-col>
                    <el-col :span="12" class="needTurn">
                        <el-form-item label="学号：">
                            <br class="diff">
                            <el-input v-model="form.studentNo" :disabled="isDisabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="学号：" class="needShow">
                    <br class="diff">
                    <el-input v-model="form.studentNo" :disabled="isDisabled"></el-input>
                </el-form-item>
                <el-form-item label="学校：" class="needShow">
                    <br class="diff">
                    <el-input v-model="form.university" :disabled="isDisabled"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="学院：">
                            <br class="diff">
                            <el-input v-model="form.school" :disabled="isDisabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" class="needTurn">
                        <el-form-item label="学校：">
                            <br class="diff">
                            <el-input v-model="form.university" :disabled="isDisabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="邮箱：">
                    <br class="diff">
                    <el-input ref="email"
                              v-model="form.email"
                              :disabled="emailVisible"
                              style="width: 20vw; margin-right: 10px"></el-input>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-edit"
                               circle
                               class="bDif"
                               v-if="emailVisible"
                               @click="showEditEmail"></el-button>
                    <el-button type="primary"
                               size="small"
                               :icon="icon"
                               circle
                               class="bDif"
                               v-if="!emailVisible"
                               @click="editEmail"></el-button>
                </el-form-item>
                <el-form-item label="电话：">
                    <br class="diff">
                    <el-input ref="phone"
                              v-model="form.phone"
                              :disabled="phoneVisible"
                              style="width: 20vw;margin-right: 10px"></el-input>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-edit"
                               circle
                               class="bDif"
                               v-if="phoneVisible"
                               @click="showEditPhone"></el-button>
                    <el-button type="primary"
                               size="small"
                               :icon="icon"
                               circle
                               class="bDif"
                               v-if="!phoneVisible"
                               @click="editPhone"></el-button>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-button size="small"
                               type="primary"
                               :disabled="sendBtn.isSend"
                               @click="editPassword">{{sendBtn.text}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
    import {modifyPersonalInfo, personalInfo} from "@/api/userConsole";
    import {validateEmail, validatePhoneNo } from "@/utils/validator";
    import {forgetPass} from "@/api/login";

    export default {
        name: "personalInfo",
        data() {
            return{
                isDisabled: true,
                emailVisible: true,
                phoneVisible: true,
                icon:'el-icon-check',
                form: {
                    studentNo: '',
                    name: '',
                    school: '',
                    university: '',
                    phone: '',
                    email: '',
                    username: '',
                    password:''
                },
                sendBtn:{
                    isSend: false,
                    text: '修改密码'
                }
            }
        },
        methods: {
            getPersonalInfo() {
                personalInfo().then(response => {
                    this.form = response.data.data
                })
            },
            showEditEmail() {
                this.emailVisible = false;
                this.$nextTick(() => {
                    this.$refs.email.focus()
                })
            },
            editEmail() {
                const data = this.form;
                if(!validateEmail(data.email)) {
                    this.$message('邮箱格式错误')
                    return false;
                }

                this.icon = 'el-icon-loading';
                const value = {
                    email: data.email,
                }
                modifyPersonalInfo(value).then( () => {
                    this.$message({
                        type:"success",
                        message:"修改成功！"
                    })
                }).catch( error => {
                    this.$message.error(error.response.data);
                }).finally( () => {
                    this.getPersonalInfo();
                    this.emailVisible = true;
                    this.icon = 'el-icon-check';
                })
            },
            showEditPhone() {
                this.phoneVisible = false;
                this.$nextTick(() => {
                    this.$refs.phone.focus()
                })
            },
            editPhone() {
                const data = this.form;
                if(!validatePhoneNo(data.phone)) {
                    this.$message('电话格式错误')
                    return false;
                }
                this.icon = 'el-icon-loading';
                const value = {
                    phone: data.phone,
                }

                modifyPersonalInfo(value).then( () => {
                    this.$message({
                        type:"success",
                        message:"修改成功！"
                    })
                }).catch( error => {
                    this.$message.error(error.response.data);
                }).finally( () => {
                    this.getPersonalInfo();
                    this.phoneVisible = true;
                    this.icon = 'el-icon-check';
                })
            },
            editPassword() {
                forgetPass(this.form.studentNo).then( () => {
                    this.sendBtn.isSend = true;
                    this.sendBtn.text = '发送中';
                    this.countDown(60);
                    this.$message.success('邮件已发送，请注意查收')
                }).catch( error => {
                    this.$message.error( error.response.data);
                })
            },
            //倒计时
            countDown(time) {
                let timeNum = time + 1;
                const timer = setInterval( () => {
                    timeNum--;
                    if (timeNum === -1) {
                        clearInterval(timer);
                        this.sendBtn.text = '重新发送';
                        this.sendBtn.isSend = false;
                    } else {
                        this.sendBtn.text = `${timeNum} 秒`;
                    }
                },1000)
            }
        },
        mounted() {
            this.getPersonalInfo()
        }
    }
</script>

<style lang="scss" scoped>

    .infoForm {
        width: 80%;
        max-width: 600px;
        margin: 40px auto;
    }

    .wrapTitle {
        font-size: 26px;
        text-align: center;
        font-family: "幼圆" , serif;
    }

    .submitButton {
        margin: 20px auto;
    }

    /deep/.el-input.is-disabled .el-input__inner {
        cursor: auto;
        color: #303133;
        background-color: #fff;
        border-top: 1px solid transparent;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
    }


    @media screen and (max-width: 420px){

        #infoForm {
            width: 200px;
            background-color: #FFFFFF;
        }

        #infoWrap {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 0 auto;
            padding: 0;
            width: 200px;
            background-color: #FFFFFF;
        }

        .bDif{
            position: absolute;
            bottom: 7.2vh;
            right: 7vw
        }

        /deep/.needTurn{
            display: none;
        }

        /deep/ .el-form{
            position: absolute;
            left: 0;
        }

        /deep/ .el-input__inner{
            margin-left:-22vw;
            width:55vw;
            display:block;
        }

    }

    @media screen and (min-width: 421px){

        .diff{
            display: none;
        }

        .needShow{
            display: none;
        }

    }

</style>
