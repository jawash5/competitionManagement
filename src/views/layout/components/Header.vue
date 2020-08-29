<template>
    <div id="headWrap">
        <div class="close">
            <div class="userInfo">
                {{ username }}
            </div>
            <div>
                <img alt="关闭" src="../../../assets/main/close.png" @click="exit">
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return{

            }
        },
        methods:{
            exit:function () {
                this.$store.dispatch('app/exit').then(() => {
                    this.$router.push({
                        path:'/login'
                    })
                })
            }
        },
        computed:{
            username: function (){
                return this.$store.state.app.userName
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/config.scss";
    #headWrap {
        position: fixed;
        top: 0;
        right: 0;
        left: $navMenu;
        height: 60px;
        background-color: #fff;
        z-index:1;
        -webkit-box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
    }

    .close {
        float: right;
        width: 200px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .userInfo {
            margin: 0 auto;
        }

        img {
            width: 30px;
            margin: 0 20px 0 10px;
            cursor: pointer;
        }
    }


</style>