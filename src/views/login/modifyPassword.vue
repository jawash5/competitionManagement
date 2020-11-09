<template>
    <div class="modifyPassword">
        <head-login :state="state"></head-login>
        <div>
            <el-steps space="10vw" :active="1" finish-status="success">
                <el-step title="已完成"></el-step>
                <el-step title="进行中"></el-step>
                <el-step title="步骤 3"></el-step>
            </el-steps>
            <el-card class="wrap">

                <el-form v-model="form">
                    <el-form-item label="新密码">
                        <el-input v-model="form.newPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="重复密码">
                        <el-input v-model="form.reNewPassword"></el-input>
                    </el-form-item>

                </el-form>

                <el-button type="primary" round>确认修改</el-button>
            </el-card>
        </div>

        <my-footer></my-footer>
    </div>
</template>

<script>
    import HeadLogin from "@/views/login/components/headLogin";
    import {getCode} from "@/utils/app";
    import MyFooter from "@/views/login/components/myFooter";
    export default {
        name: "modifyPassword",
        components: {MyFooter, HeadLogin},
        data() {
            return {
                form:{
                    newPassword:'',
                    reNewPassword:''
                }

            }
        },
        computed:{
            state() {
                return getCode() === '0';
            }
        },
    }
</script>

<style lang="scss" scoped>
    .modifyPassword {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;

        .wrap {
            width: 30vw;
            margin: 0 auto;
        }
    }

</style>