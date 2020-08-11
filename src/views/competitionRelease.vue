<template>
    <div id="adminManagement">
        <head-login></head-login>
        <div id="wrap">
            <admin-menu></admin-menu>
            <div id="competitionRelease">
                <div id="mainInfo">
                    <el-col :span="3">
                        <p class="fontTitle">第</p>
                    </el-col>
                    <el-col :span="3">
                        <el-input v-model="form.session" maxlength="3"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <p class="fontTitle" >届</p>
                    </el-col>
                    <el-col :span="10">
                        <el-input v-model="form.competitionName"></el-input>
                    </el-col>
                    <el-col :span="5">
                        <p class="fontTitle">大赛</p>
                    </el-col>
                </div>

                <div id="signUpTime">
                    <el-col :span="6">
                        <p class="fontP">报名时间:</p>
                    </el-col>
                    <el-col :span="18">
                        <el-date-picker
                                v-model="form.signUptime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-col>
                </div>
                <div id="competitionTime">
                    <el-col :span="6">
                        <p class="fontP">作品提交时间:</p>
                    </el-col>
                    <el-col :span="18">
                        <el-date-picker
                                v-model="form.competitionTime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-col>
                </div>
                <el-divider></el-divider>
                <div id="formDesign">

                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headLogin from "@/components/headLogin";
    import myFooter from "@/components/myFooter";
    import adminMenu from "@/components/adminMenu";

    export default {
        name: "competitionRelease",
        components: {
            'headLogin': headLogin,
            'myFooter': myFooter,
            'adminMenu':adminMenu
        },
        data() {
            return {
                statement:false,
                form:{
                    session:'',
                    competitionName:'',
                    signUptime:'',
                    competitionTime:''

                }

            };
        },
        methods: {
        }
    }
</script>

<style scoped src="../styles/adminManagement/competitionRelease.css">

</style>