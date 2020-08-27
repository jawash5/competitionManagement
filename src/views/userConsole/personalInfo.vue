<template>
    <div id="myProject">
        <div id="wrapTitle">个人资料</div>
        <div id="infoWrap">
            <div id="infoForm">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="姓名">
                            <el-input v-model="form.name" :disabled="isDisabled" class="itemInput"></el-input>
                        </el-form-item></el-col>
                        <el-col :span="12">
                            <el-form-item label="学号">
                                <el-input v-model="form.id" :disabled="isDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.mail" :disabled="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="学院">
                        <el-input v-model="form.college" :disabled="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password" :disabled="isDisabled"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="submitButton">
                <el-button type="primary" @click="onSubmit" v-if="editInfo">确定</el-button>
                <el-button type="primary" @click="edit" v-if="!editInfo">修改资料</el-button>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "personalInfo",
        data() {
            return{
                activeName:'create',
                isDisabled: true,
                editInfo: false,
                form: {
                    name: '',
                    id: '',
                    mail: '',
                    college: '',
                    password: '',
                }
            }
        },
        methods: {
            edit:function () {
                this.isDisabled = false;
                this.editInfo = true;
            },
            onSubmit:function () {
                this.isDisabled = true;
                this.editInfo = false;
            }
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
    }
</style>