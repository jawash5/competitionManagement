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
                <div class="tip">复制以下链接或保存二维码发送给队友吧！<span v-if="$route.path!=='/editProject'">(您也可以在"我的团队"中进行好友邀请)</span></div>

                <div class="link">
                    <vue-qr ref="qrCode" :text="url + '?token=' + token"></vue-qr>
                    <el-divider direction="vertical"></el-divider>
                    <div style="height: 200px ;width: 200px;font-size: 16px">
                        <div style="font-size: 16px;">链接地址（单击复制）：</div>
                        <h3 class="url" @click="copyLink">{{url + '?token=' + token}}</h3>
                    </div>
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
    import format from '@/utils/timeFormat';
    import VueQr from 'vue-qr';


    export default {
        name: "invite",
        components:{VueQr},
        props:{
            visible:{
                type:Boolean,
                require:true,
                default:false,
            },
            groupId: {
                type: Number,
                require: true
            }
        },
        data() {
            return {
                token:'',
                url: '',
                qrCode:''
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

            //复制链接
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

    /deep/.el-dialog__title {
        font-size: 22px;
    }

    /deep/.el-divider--vertical {
        height: 250px;
        margin: 0 50px;
    }


</style>