<template>
    <div class="acceptInvitation">
        <el-card class="card">
            <div class="inviteInfo">
                <div class="avatar">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                               :size="80"></el-avatar>
                    <i class="el-icon-close" style="font-size: 40px"></i>
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                               :size="80"></el-avatar>
                </div>
                <h3 class="content"><span class="underline">{{groupInfo.username}}</span> ，您好！您被 </h3>
                <h3 class="content">小组 <span class="underline">{{ groupInfo.name }}</span> 的</h3>
                <h3 class="content">组长 <span class="underline">{{groupInfo.captainName}}</span> 所邀请</h3>

                <el-divider></el-divider>
                <div style="font-size: 18px">请问您是否加入该小队？</div>

                <el-button type="primary" class="buttons" @click="accept">接受</el-button>
            </div>
            <el-divider></el-divider>
            <h3 style="color:DarkOrange; font-size: 20px;">注意事项：</h3>
                    <div class="content" v-for="(item,index) in arr" :key="item.id">{{index+1}}、{{item}}</div>
        </el-card>
    </div>
</template>

<script>
    import {acceptInvitation, tokenInfo, personalInfo} from "@/api/userConsole";
    import {getCode} from "@/utils/app";

    export default {
        name: "acceptInvitation",
        data() {
            return {
                visible: true,
                token:'',
                groupInfo:{
                    username:'@username',
                    name:'@groupName',
                    captainName:'@captainName',
                },
                arr:["第一，绝对不意气用事；","第二，绝对不漏判任何一件坏事；","第三，绝对裁判得公正漂亮;","裁判机器人蜻蜓队长前来觐见！"]
            }
        },
        methods:{
            accept() {
                const data = new FormData();
                data.append('token', this.token)

                acceptInvitation(data).then( response => {
                    if (response.data.data === '加入成功') {
                        this.$message.success(response.data.data);
                        sessionStorage.removeItem('groupList');
                        this.$router.push('/myProject');
                    } else {
                        this.$message(response.data.data);
                    }

                })
            },
            //根据token获取队伍信息
            getTeamInfo() {
                this.token = this.$route.query.token;
                const data = new FormData();
                data.append('token', this.token)
                tokenInfo(data).then(response => {
                    const groupInfo = this.groupInfo
                    groupInfo.name = response.data.data.name;
                    groupInfo.captainName = response.data.data.captainName;
                })
            },
            //检验登录状态
            checkLogin() {
                if (getCode() === '0') {
                    personalInfo().then( response => {
                        this.getTeamInfo();
                        this.groupInfo.username = response.data.data.name;
                    })
                } else {
                    this.$message('未登录请先登录')
                    this.$router.push({
                        path:'/login',
                        query:{
                            redirect: this.$route.path,
                            token: this.$route.query.token
                        }
                    })
                }

            }
        },
        mounted() {
            this.checkLogin();
        }
    }
</script>

<style lang="scss" scoped>

    .login {
        width: 300px;
        margin: 0 auto;
    }

    .acceptInvitation {
        height: 100vh;
        min-height: 600px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card {
        width: 900px;
        height: 500px;
        padding: 40px;
    }

    .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .inviteInfo {
        text-align: center;
    }

    .content {
        margin-top: 10px;
        font-size: 16px;

        .underline {
            border-bottom: 1px solid #303133;
        }
    }

    .buttons {
        margin: 20px 10px 0 10px;
        width: 100px;
    }

    @media screen and (max-width: 420px) {
        .card {
            width: 100%;
            height: 500px;
            padding: 40px;
        }
    }
</style>