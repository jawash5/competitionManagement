<template>
    <div id="personalCenter">
        <head-login :state="statement"></head-login>
        <div id="myProject">
            <personal-menu></personal-menu>
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
                <div>
                    <el-button type="primary" @click="onSubmit" v-if="editInfo">确定</el-button>
                    <el-button type="primary" @click="edit" v-if="!editInfo">修改资料</el-button>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headLogin from "@/components/headLogin";
    import myFooter from "@/components/myFooter";
    import personalMenu from "@/components/personalMenu";

    export default {
        name: "personalInfo",
        data() {
            return{
                activeName:'create',
                statement: false,
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
        components:{
            "headLogin":headLogin,
            "myFooter":myFooter,
            "personalMenu":personalMenu
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

<style scoped src="../styles/personalCenter/personalCenter.css"></style>
<style scoped src="../styles/personalCenter/personalInfo.css"></style>