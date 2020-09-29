<template>
    <div id="myProject">
        <div id="wrapTitle">个人资料</div>
        <div id="infoWrap">
            <div id="infoForm">
                <el-form ref="form" :model="form" label-width="60px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username" :disabled="isDisabled"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="姓名">
                            <el-input v-model="form.name" :disabled="isDisabled" class="itemInput"></el-input>
                        </el-form-item></el-col>
                        <el-col :span="12">
                            <el-form-item label="学号">
                                <el-input v-model="form.studentNo" :disabled="isDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="学院">
                                <el-input v-model="form.school" :disabled="editDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学校">
                                <el-input v-model="form.university" :disabled="isDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email" :disabled="editDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="form.phoneNo" :disabled="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input show-password v-model="form.password" :disabled="editDisabled"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="submitButton">
                <el-button type="primary" v-if="editDisabled" @click="editDisabled = false">修改资料</el-button>
                <el-button type="danger" v-if="!editDisabled" @click="submitInfo">确定修改</el-button>
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
                editDisabled: true,
                form: {
                    studentNo: '',
                    name: '',
                    school: '',
                    university: '',
                    phoneNo: '',
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
        color: #606266;
    }
</style>