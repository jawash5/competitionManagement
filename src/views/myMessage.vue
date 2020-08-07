<template>
    <div id="personalCenter">
        <head-login :state="statement"></head-login>
        <div id="myProject">
            <personal-menu></personal-menu>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headLogin from "@/components/headLogin";
    import myFooter from "@/components/myFooter";
    import personalMenu from "@/components/personalMenu";

    export default {
        name: "myMessage",
        data() {
            return{
                activeName:'create',
                statement:false
            }
        },
        components:{
            "headLogin":headLogin,
            "myFooter":myFooter,
            "personalMenu":personalMenu
        }
    }
</script>

<style scoped>
    @import "../styles/global.css";
    @import "../styles/personalCenter/personalCenter.css";
</style>