<template>
    <div id="myProject">
        <competition-card-user competition-name="电子商务竞赛"></competition-card-user>
    </div>
</template>

<script>
    import competitionCardUser from "@/views/userConsole/components/competitionCardUser";
    export default {
        name: "viewCompetition",
        data() {
            return{
                activeName:'create',
                statement:false,
            }
        },
        components:{
            "competitionCardUser":competitionCardUser
        },
        methods:{
            signUp:function () {
                this.$router.push({
                    path:'/projectDetail'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .message {
        width: 1200px;
        margin: 0 auto;
    }

    /deep/.el-tabs__item {
        font-family: "幼圆" , serif;
        width: 180px;
        height: 50px;
        font-size: 16px;
    }

</style>

