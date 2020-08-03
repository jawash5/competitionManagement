<template>
    <div>
        <head-menu active-index="announcement"></head-menu>
    </div>
</template>

<script>
    import headMenu from "@/components/headMenu.vue";

    export default {
        name: "announcement",
        data() {
            return{

            }
        },
        components:{
            "headMenu":headMenu,
        }
    }
</script>

<style scoped>
    @import "../styles/global.css";
</style>