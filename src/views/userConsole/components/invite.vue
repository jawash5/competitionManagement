<template>
    <div>
        <el-dialog title="邀请队友"
                   :visible.sync="visible"
                   width="800px"
                   center
                   :show-close="false"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   @open="getToken">
            <div>
                <div class="tip">复制以下链接或二维码发送给队友吧！(您也可以在"我的团队"中进行好友邀请)</div>

                <div class="link">
                    <div style="height: 200px ;width: 200px; background-color: lightgreen"></div>
                    <el-divider direction="vertical"></el-divider>
                    <div style="height: 200px ;width: 200px;font-size: 16px">
                        <div style="font-size: 16px;">链接地址：</div>
                        <h3 class="url">{{url + '?token=' + token}}</h3>
                    </div>
                </div>

                <div class="buttons">
                    <el-button class="copy" size="small">复制二维码</el-button>
                    <span style="width: 0; margin: 0 50px"></span>
                    <el-button class="copy" size="small" @click="copyLink">复制链接</el-button>
                </div>
            </div>

            <span slot="footer">
                <el-button type="primary" @click="dialogClose()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {inviteMembers} from "@/api/userConsole";
    import format from '@/utils/timeFormat'

    export default {
        name: "invite",
        props:{
            visible:{
                type:Boolean,
                require:true,
                default:false,
            },
            groupId: {
                type: String,
                require: true
            }
        },
        data() {
            return {
                token:'',
                url: ''
            }
        },
        methods:{
            dialogClose() {
                this.$emit('update:dialogClose',false)
            },
            getToken() {
                  const time = format('YYYY-MM-DD HH:mm:ss')
                  const data = {
                      groupId: this.groupId,
                      date: time
                  }

                  inviteMembers(data).then( response => {
                      this.token = encodeURIComponent(response.data.data)
                  }).catch( error => {
                      this.$message.error(error.response.data)
                  })
            },
            copyLink() {
                this.$copyText(this.url + '?token=' + this.token).then( () => {
                    this.$message.success('复制成功！')
                })
            },
            setUrl() {
                const url = this.$router.app.$el.baseURI;
                if(url.indexOf('editProject') !== -1) {
                    this.url = url.replace('editProject','acceptInvitation')
                } else if (url.indexOf('competitionDetail') !== -1) {
                    const id = this.$route.query.id;
                    const searchValue = 'competitionDetail?id=' + id
                    this.url = url.replace(searchValue,'acceptInvitation')
                }
            }
        },
        mounted() {
            this.setUrl();
        }
    }
</script>

<style lang="scss" scoped>
    .tip {
        font-size: 18px;
        width: 100%;
        text-align: center;
    }

    .link {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 300px;
    }

    .url {
        cursor: pointer;
        text-decoration: underline;
        margin-top: 20px;
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .copy {
        margin: 0 50px
    }

    /deep/.el-dialog__title {
        font-size: 22px;
    }

    /deep/.el-divider--vertical {
        height: 250px;
        margin: 0 50px;
    }
</style>