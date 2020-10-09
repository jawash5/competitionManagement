<template>
    <div id="myProject">
        <div id="wrapTitle">个人资料</div>
        <div id="infoWrap">
            <div id="infoForm">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名：">
                        <el-input v-model="form.username" :disabled="isDisabled"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="姓名：">
                            <el-input v-model="form.name" :disabled="isDisabled" class="itemInput"></el-input>
                        </el-form-item></el-col>
                        <el-col :span="12">
                            <el-form-item label="学号：">
                                <el-input v-model="form.studentNo" :disabled="isDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="学院：">
                                <el-input v-model="form.school" :disabled="isDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学校：">
                                <el-input v-model="form.university" :disabled="isDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="邮箱：">
                        <el-input v-model="form.email" :disabled="editMail" style="width: 250px;margin-right: 10px"></el-input>
                        <el-button type="primary"
                                   size="small"
                                   icon="el-icon-edit"
                                   circle
                                   v-if="editMail"
                                   @click="editMail = false"></el-button>
                        <el-button type="primary"
                                   size="small"
                                   :icon="icon"
                                   circle
                                   v-if="!editMail"
                                   @click="edit"></el-button>
                    </el-form-item>
                    <el-form-item label="电话：">
                        <el-input v-model="form.phone" :disabled="editPhone" style="width: 250px;margin-right: 10px"></el-input>
                        <el-button type="primary"
                                   size="small"
                                   icon="el-icon-edit"
                                   circle
                                   v-if="editPhone"
                                   @click="editMail = false"></el-button>
                        <el-button type="primary"
                                   size="small"
                                   :icon="icon"
                                   circle
                                   v-if="!editPhone"
                                   @click="edit"></el-button>
                    </el-form-item>
                    <el-form-item label="密码：">
                        <el-button size="small" type="primary">修改密码</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>

</template>

<script>
    import {modifyPersonalInfo, personalInfo} from "@/api/userConsole";

    export default {
        name: "personalInfo",
        data() {
            return{
                isDisabled: true,
                editMail: true,
                editPhone: true,
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
            }
        },
        methods: {
            getPersonalInfo() {
                personalInfo().then(response => {
                    this.form = response.data.data
                })
            },
            submitInfo() {
                const data = this.form;
                if(data.password === '' || data.school === '' || data.email === '') {
                    this.$message.error("请输入完整信息");
                    return false;
                }
                const value = {
                    password: data.password,
                    email: data.email,
                    college: data.school
                }
                modifyPersonalInfo(value).then( () => {
                    this.$message({
                        type:"success",
                        message:"修改成功！"
                    })
                    this.editDisabled = true;
                    this.getPersonalInfo();
                })
            },
            edit() {
                this.icon = 'el-icon-loading';
                const data = this.form;
                const value = {
                    email: data.email,
                }
                modifyPersonalInfo(value).then( () => {
                    this.$message({
                        type:"success",
                        message:"修改成功！"
                    })
                    this.icon = 'el-icon-check';
                    this.editMail = true;
                    this.getPersonalInfo();
                }).catch( () => {
                    this.editMail = true;
                    this.icon = 'el-icon-check';
                })
            }
        },
        mounted() {
            this.getPersonalInfo()
        }
    }
</script>

<style lang="scss" scoped>
    #myProject {
        display: flex;
        flex-direction: column;
    }

    #infoForm {
        width: 500px;
        margin: 0 auto;
        background-color: #FFFFFF;
    }

    #infoWrap {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0 auto;
        padding: 50px 0;
        width: 1000px;
        background-color: #FFFFFF;
    }

    #wrapTitle {
        font-size: 26px;
        margin: 0 auto;
        font-family: "幼圆" , serif;
    }

    .submitButton {
        margin: 20px auto;
    }

    /deep/.el-input.is-disabled .el-input__inner {
        cursor: auto;
        color: #303133;
        background-color: #fff;
        border-top: none;
        border-left: none;
        border-right: none;
    }
</style>