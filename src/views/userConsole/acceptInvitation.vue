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
                <h3 class="content">{{username}} ，您好！您被 </h3>
                <h3 class="content">小组{{ groupName }}的</h3>
                <h3 class="content">组长{{groupLeaderName}}所邀请</h3>

                <el-divider></el-divider>
                <div style="font-size: 18px">请问您是否加入该小队？</div>

                <el-button type="primary" class="buttons" @click="accept">接受</el-button>
            </div>
            <el-divider></el-divider>
            <h3 style="color:DarkOrange; font-size: 20px;">注意事项：</h3>
                    <div class="content" v-for="(item,index) in arr" :key="item.id">{{index+1}}、{{item}}</div>
        </el-card>

        <el-dialog title="登录"
                   :visible.sync="visible"
                   width="500px"
                   center
                   :show-close="false"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form :model="ruleForm" ref="ruleForm" class="login">
                <el-form-item prop="username">
                    <el-input placeholder="用户名"
                              prefix-icon="iconshequ"
                              v-model="ruleForm.username"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码"
                              prefix-icon="iconmima"
                              type="password"
                              show-password
                              clearable
                              v-model="ruleForm.password"
                              autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="login">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {login} from "@/api/login";
    import {acceptInvitation} from "@/api/userConsole";

    export default {
        name: "acceptInvitation",
        data() {
            return {
                visible: true,
                ruleForm:{
                    username:'name5',
                    password:'password123'
                },
                token:'',
                username:'@username',
                groupName:'@groupName',
                groupLeaderName:'@leader',
                arr:["第一，绝对不意气用事；","第二，绝对不漏判任何一件坏事；","第三，绝对裁判得公正漂亮;","裁判机器人蜻蜓队长前来觐见！"]
            }
        },
        methods:{
            login() {
                const data = new FormData();
                data.append('username', this.ruleForm.username);
                data.append('password', this.ruleForm.password);
                login(data).then( () => {
                    this.$message.success('登录成功！')
                    this.visible = false;
                    this.token = this.$route.query.token;
                } )
            },
            accept() {
                const data = new FormData();
                data.append('token', this.token)

                acceptInvitation(data).then( response => {
                    this.$message.success(response.data.data)
                })
            }
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
    }

    .buttons {
        margin: 20px 10px 0 10px;
        width: 100px;
    }
</style>