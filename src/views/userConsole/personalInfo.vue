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
                                <el-input v-model="form.school" :disabled="isDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学校">
                                <el-input v-model="form.university" :disabled="isDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email" :disabled="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="form.phoneNo" :disabled="isDisabled"></el-input>
                    </el-form-item>

                </el-form>
            </div>
            <div class="submitButton">
                <el-button type="primary" @click="dialogVisible = true">修改资料</el-button>
            </div>
        </div>
        <el-dialog
                title="修改信息"
                :visible.sync="dialogVisible"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false"
                center>
            <el-form :model="form" label-width="60px">
                <el-form-item label="新密码">
                    <el-input placeholder="请输入新密码" v-model="editInfo.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input placeholder="请输入邮箱" v-model="editInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="学院">
                    <el-input placeholder="请输入学院" v-model="editInfo.college"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submitInfo">确 定</el-button>
            </span>
        </el-dialog>

    </div>

</template>

<script>
    import {modifyPersonalInfo, personalInfo} from "@/api/userConsole";

    export default {
        name: "personalInfo",
        data() {
            return{
                isDisabled: true,
                dialogVisible:false,
                form: {
                    studentNo: null,
                    name: '',
                    school: '',
                    university: '',
                    phoneNo: '',
                    email: '',
                    username: ''
                },
                editInfo:{
                    password:'',
                    email: '',
                    college:''
                }
            }
        },
        methods: {
            getPersonalInfo() {
                personalInfo().then(response => {
                    this.form = response.data.data
                })
            },
            cancel() {
                this.dialogVisible = false;
                this.editInfo.password = '';
                this.editInfo.email = '';
                this.editInfo.college = '';
            },
            submitInfo() {
                const data = this.editInfo;
                if(data.password === '' || data.college === '' || data.email === '') {
                    this.$message.error("请输入完整信息");
                    return false;
                }
                modifyPersonalInfo(data).then(
                    this.$message({
                        type:"success",
                        message:"修改成功！"
                    })
                )
                this.dialogVisible = false;

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
        background-color:#ffffff;
        color: #606266;
    }
</style>