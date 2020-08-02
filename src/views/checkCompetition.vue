<template>
    <div id="checkCompetition">
        <head-menu></head-menu>
        <div>
            <competition></competition>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import headMenu from "@/components/headMenu.vue";
    import footer from "@/components/footer";
    import competition from "@/components/competition";

    export default {
        name: "index",
        components:{
            "headMenu": headMenu,
            "myFooter": footer,
            "competition": competition
        }
    }
</script>

<style scoped>
    @import "../styles/global.css";
    @import "../styles/checkCompetition/checkCompetition.css";
</style>