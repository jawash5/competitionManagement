<template>
    <div class="forgetPassword">
        <head-login></head-login>
        <div class="wrap">
            <div class="wrapMain">
                <div class="title">找 回/修 改 密 码</div>
                <el-input v-model="studentNo"
                          prefix-icon="iconshequ"
                          placeholder="请输入学号"
                          @keydown.enter.native="sendEmail"
                          autocomplete="off">
                    <el-button class="btn--sendMail"
                               type="danger"
                               :disabled="sendBtn.isSend"
                               slot="suffix"
                               @click="sendEmail">{{ sendBtn.text }}</el-button>
                </el-input>
                <div class="div-30"></div>

                <el-button class="btn--back"
                           type="primary"
                           round
                           @click="$router.push('/login')">返回登录</el-button>

            </div>

            <div class="divider"></div>

            <img class="img" alt="下雨" src="../../assets/main/forget.png">
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import HeadLogin from "@/views/login/components/headLogin";
    import MyFooter from "@/views/login/components/myFooter";
    import {getCode} from "@/utils/app";
    import {validateStudentNumber} from "@/utils/validator";
    import {forgetPass} from "@/api/login";

    export default {
        name: "forgetPassword",
        components: {MyFooter, HeadLogin},
        data() {
            return {
                studentNo:'',
                sendBtn: {
                    text: '发送邮件',
                    isSend: false,
                },
            }
        },
        computed:{
            state() {
                return getCode() === '0';
            }
        },
        methods: {
            sendEmail() {
                //校验输入的学号信息
                if (!validateStudentNumber(this.studentNo)) {
                    this.$message.error('学号输入有误');
                    return false;
                }
                //发送邮件
                forgetPass(this.studentNo).then( () => {
                    this.sendBtn.isSend = true;
                    this.sendBtn.text = '发送中';
                    this.countDown(60);
                    this.$message.success('邮件已发送');
                }).catch( error => {
                    this.$message.error( error.response.data);
                })
            },
            //倒计时
            countDown(time) {
                let timeNum = time + 1;
                const timer = setInterval( () => {
                    timeNum--;
                    if (timeNum === -1) {
                        clearInterval(timer);
                        this.sendBtn.text = '重新发送';
                        this.sendBtn.isSend = false;
                    } else {
                        this.sendBtn.text = `${timeNum} 秒`;
                    }
                },1000)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .forgetPassword {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
        min-height: 700px;

        .wrap {
            background-color: #FFFFFF;
            margin: 0 auto;
            height: 500px;
            width: 1000px;
            display: flex;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

            .wrapMain {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: 360px;
                width: 360px;
                padding: 20px;
                margin: 0 auto;

                .title {
                    color: #303133;
                    margin: 30px;
                    font-weight: 900;
                    font-size: 28px;
                    font-family: "幼圆" , serif;
                    text-align: center;
                }

                /deep/.el-input__suffix {
                    right: 0;
                }

                .btn--sendMail {
                    border-radius: 0 3px 3px 0;
                }

                .btn--back {
                    margin: 0 auto;
                }
            }

            .img {
                width: 400px;
                margin: 0 auto;
            }

            .divider {
                border: .5px solid #DCDFE6;
                height:400px;
            }
        }
    }

    @media screen and (max-width: 1000px) {
        .forgetPassword {

            .wrap {
                width: 80vw;
                transition: all .2s;
                .divider {
                    display: none;
                }

                .img{
                    display: none;
                }
            }
        }
    }

    @media screen and (max-width: 426px){
        .forgetPassword {
            .wrap {
                width: 100vw;
            }
        }
    }

    @media screen and (max-width: 363px){
        /deep/.el-input__inner{
            width: 90vw;
        }
    }
</style>